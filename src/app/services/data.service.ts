import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

interface DashboardData {
  user: number;
  plante: number;
  article: number;
  maladie: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/data';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardData> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
      console.error('No access token found');
      return throwError(() => new Error('No access token found'));
    }

    // Create headers with the access token
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json');

    return this.http.get<DashboardData>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        if (error.status === 403) {
          console.log('Token might be expired, trying with refresh token...');
          // Log the tokens for debugging
          console.log('Access Token:', accessToken);
          console.log('Headers being sent:', headers);
        }
        return throwError(() => error);
      })
    );
  }
} 
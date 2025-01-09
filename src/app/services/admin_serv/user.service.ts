import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8088/api/user';
  private baseUrl = 'http://localhost:8088';

  constructor(private http: HttpClient) {}

  private getHeaders(isFormData: boolean = false): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    const headers: any = {
      'Authorization': `Bearer ${token}`
    };
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    return new HttpHeaders(headers);
  }

  getImageUrl(imagePath: string | null): string {
    if (!imagePath) {
      return `${this.baseUrl}/assets/avatar.png`;
    }
    return `${this.baseUrl}/${imagePath}`;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/list`, {
      headers: this.getHeaders()
    });
  }

  addUser(userData: FormData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, userData, {
      headers: this.getHeaders(true)
    });
  }

  updateUser(id: number, userData: FormData): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, userData, {
      headers: this.getHeaders(true)
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
} 
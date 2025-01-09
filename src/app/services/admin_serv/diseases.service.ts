import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disease } from '../../models/disease.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiseasesService {
  private apiUrl = environment.apiUrl + environment.maladiesController.listMaladies;

  constructor(private http: HttpClient) { }

  getAllDiseases(): Observable<Disease[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Disease[]>(this.apiUrl, { headers });
  }
} 
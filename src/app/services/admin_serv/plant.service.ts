import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant, PlantResponse } from '../../models/plant.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private apiUrl = `${environment.apiUrl}/api/plantes`;

  constructor(private http: HttpClient) { }

  private getHeaders(isFormData: boolean = false): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    
    let headers = new HttpHeaders();
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Only set Content-Type for non-FormData requests
    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return headers;
  }

  getPlants(page: number = 0, size: number = 12, search?: string, maladie?: string): Observable<PlantResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }
    if (maladie) {
      params = params.set('maladie', maladie);
    }

    return this.http.get<PlantResponse>(this.apiUrl, { 
      params,
      headers: this.getHeaders()
    });
  }

  getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  createPlant(plantData: FormData): Observable<Plant> {
    return this.http.post<Plant>(this.apiUrl, plantData, {
      headers: this.getHeaders(true)
    });
  }

  updatePlant(id: number, plantData: FormData): Observable<Plant> {
    // Log the headers for debugging
    const headers = this.getHeaders(true);
    console.log('Update plant headers:', headers);
    
    return this.http.put<Plant>(`${this.apiUrl}/${id}`, plantData, {
      headers: headers
    });
  }

  deletePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
} 
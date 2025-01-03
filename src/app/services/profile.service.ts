import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserResponse } from '../interfaces/user/user-response.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}${environment.compteController.Profile}`);
  }

  // Accept FormData instead of UserRequest
  updateUser(formData: FormData): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}${environment.compteController.Profile}`, formData);
  }
}

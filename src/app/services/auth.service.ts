import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, AuthResponse } from '../models/auth.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  public role?: string;
  public isAuthenticated = false;

  constructor(private http: HttpClient) {
    // Check if user is already authenticated
    const token = this.getToken();
    if (token) {
      this.loadProfile(token, this.getRefreshToken() || '');
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.loadProfile(response.token, response.refreshToken);
        })
      );
  }

  register(prenom: string, nom: string, email: string, password: string, file: File | null = null): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('prenom', prenom);
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('password', password);
    if (file) {
      formData.append('file', file);
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, formData)
      .pipe(
        tap(response => {
          this.loadProfile(response.token, response.refreshToken);
        })
      );
  }

  refresh(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { token });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`).pipe(
      tap(() => {
        this.clearAuth();
      })
    );
  }

  loadProfile(token: string, refreshToken: string): void {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    
    this.isAuthenticated = true;
    const decodedToken: any = jwtDecode(token);
    console.log('Decoded token:', decodedToken); // Debug log
    
    // Handle different role formats
    if (decodedToken.roles && Array.isArray(decodedToken.roles)) {
      // If roles is an array, take the first role
      this.role = decodedToken.roles[0];
    } else if (decodedToken.role) {
      // If it's a single role
      this.role = decodedToken.role;
    } else if (decodedToken.authorities && Array.isArray(decodedToken.authorities)) {
      // If using Spring Security's default authorities format
      this.role = decodedToken.authorities[0].replace('ROLE_', '');
    }
    
    console.log('Set role to:', this.role); // Debug log
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isAccessTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  isRefreshTokenExpired(): boolean {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return true;

    const decodedToken: any = jwtDecode(refreshToken);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  public clearAuth(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.isAuthenticated = false;
    this.role = undefined;
  }
}

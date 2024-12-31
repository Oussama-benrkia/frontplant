import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false; // Fixed typo in the property name
  accessToken: string = ''; // Changed type to string
  role: string | undefined; // Use string for role, optional with `undefined`

  constructor(private http: HttpClient) {}

  /**
   * Login user with email and password
   */
  public login(email: string, password: string): Observable<any> {
    const loginRequest = { email, password };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Ensure Content-Type is JSON
      }),
    };

    return this.http.post(
      `${environment.apiUrl}${environment.authController.login}`, // Use template literals
      loginRequest,
      options
    );
  }

  /**
   * Register user with required fields and optional file upload
   */
  public register(
    prenom: string,
    nom: string,
    email: string,
    password: string,
    file: File | null
  ): Observable<any> {
    const formData = new FormData();
    formData.append('prenom', prenom);
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('password', password);

    if (file) {
      formData.append('file', file, file.name); // Ensure file name is included
    }

    console.log('FormData being sent:', formData);

    return this.http.post(
      `${environment.apiUrl}${environment.authController.register}`, // Use template literals
      formData
    );
  }
  public refresh(token: string): Observable<any> {
    const loginRequest = { token };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Ensure Content-Type is JSON
      }),
    };

    return this.http.post(
      `${environment.apiUrl}${environment.authController.refreshToken}`, // Use template literals
      loginRequest,
      options
    );
  }

  public loadProfile(token: string, refreshToken: string): void {
    // Store tokens in local storage
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refreshToken);

    this.isAuthenticated = true; 
    this.accessToken = token;
    const decodedToken: any = jwtDecode(this.accessToken);
    console.log('Decoded JWT:', decodedToken);

    this.role = decodedToken.role; 
  }
  public isAccessTokenExpired(): boolean {
    if (!this.accessToken) return true;

    const decodedToken: any = jwtDecode(this.accessToken);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // Compare expiration time with current time
  }

  public isRefreshTokenExpired(): boolean {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return true;

    const decodedToken: any = jwtDecode(refreshToken);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime; // Compare expiration time with current time
  }
}

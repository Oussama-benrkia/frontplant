import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    const loginRequest = {
      email: email,
      password: password
    };

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'  // Change to JSON
      ),
    };

    console.log(environment.apiUrl + environment.authController.login);
    return this.http.post(
      environment.apiUrl + environment.authController.login,
      loginRequest, // Send loginRequest object as JSON
      options
    );
  }
}

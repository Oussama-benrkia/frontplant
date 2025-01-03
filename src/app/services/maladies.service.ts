import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { MaladiesResponse } from '../interfaces/maladies/maladies-response.interface';


@Injectable({
  providedIn: 'root'
})
export class MaladiesService {
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

    getMaladies(): Observable<MaladiesResponse[]> {
      return this.http.get<MaladiesResponse[]>(`${this.apiUrl}${environment.maladiesController.listMaladies}`)
    }
}

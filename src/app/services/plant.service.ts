import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PlantesResponse } from '../interfaces/plantes/plantes-response.interface';
import { CommentaireResponse } from '../interfaces/commentaire/commentaire-response.interface';
import { CommentaireRequest } from '../interfaces/commentaire/commentaire-request.interface';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PlantService {

    private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

    getPlantes(): Observable<PlantesResponse[]> {
        return this.http.get<PlantesResponse[]>(`${this.apiUrl}${environment.plantesController.listPlantes}`)
    }

    getPlantById(plantId:number): Observable<PlantesResponse> {
      return this.http.get<PlantesResponse>(`${this.apiUrl}${environment.plantesController.actionPlantes}${plantId}`)
    }

    searchPlant(searchData: any): Observable<PlantesResponse[]> {
       return this.http.post<PlantesResponse[]>(`${this.apiUrl}${environment.plantesController.plantes}/search`,searchData)
    }
  getComments(plantId: number): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}${environment.plantesController.commentaire}${plantId}`);
   }
    postComments(plantId:number,commentData:CommentaireRequest):Observable<CommentaireResponse>{
      return this.http.post<CommentaireResponse>(`${this.apiUrl}${environment.plantesController.commentaire}${plantId}`,commentData)
    }}

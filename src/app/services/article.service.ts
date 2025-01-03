import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleRequest } from '../interfaces/article/article-request.interface';
import { ArticleResponse } from '../interfaces/article/article-response.interface';
import { environment } from '../environments/environment';
import { CommentaireRequest } from '../interfaces/commentaire/commentaire-request.interface';
import { CommentaireResponse } from '../interfaces/commentaire/commentaire-response.interface';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
    getArticles(): Observable<ArticleResponse[]> {
      return this.http.get<ArticleResponse[]>(`${this.apiUrl}${environment.articleController.listArticles}`)
    }
    getArticleById(articleId:number): Observable<ArticleResponse> {
        return this.http.get<ArticleResponse>(`${this.apiUrl}${environment.articleController.actionArticle}${articleId}`)
    }
  searchArticle(searchData: any): Observable<ArticleResponse[]> {
       return this.http.post<ArticleResponse[]>(`${this.apiUrl}${environment.articleController.article}/search`,searchData)
    }
     getComments(articleId: number): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}${environment.articleController.commentaire}${articleId}`);
   }
    postComments(articleId:number,commentData:CommentaireRequest):Observable<CommentaireResponse>{
      return this.http.post<CommentaireResponse>(`${this.apiUrl}${environment.articleController.commentaire}${articleId}`,commentData)
    }
}

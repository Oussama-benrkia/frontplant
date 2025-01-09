import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Article, ArticleResponse } from '../../models/article.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/api/articles`;

  constructor(private http: HttpClient) { }

  getArticles(page: number = 0, size: number = 10, search?: string): Observable<ArticleResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ArticleResponse>(this.apiUrl, { params })
      .pipe(
        catchError(error => {
          console.error('Error fetching articles:', error);
          throw error;
        })
      );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching article ${id}:`, error);
          throw error;
        })
      );
  }
} 
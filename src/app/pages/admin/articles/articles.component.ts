import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/article.interface';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  displayedColumns: string[] = ['title', 'date', 'content', 'actions'];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  searchControl = new FormControl('');
  isLoading = false;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadArticles();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.pageIndex = 0;
      this.loadArticles(value || '');
    });
  }

  loadArticles(search: string = ''): void {
    this.isLoading = true;
    this.articleService.getArticles(this.pageIndex, this.pageSize, search)
      .subscribe({
        next: (response) => {
          this.articles = response.content;
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading articles:', error);
          this.isLoading = false;
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadArticles(this.searchControl.value || '');
  }

  viewArticle(id: number): void {
    this.router.navigate(['/admin/articles', id]);
  }
} 
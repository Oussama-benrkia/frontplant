import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleResponse } from '../../../../interfaces/article/article-response.interface';
import { ArticleService } from '../../../../services/article.service';

@Component({
    selector: 'app-article-search',
    templateUrl: './article-search.component.html',
    styleUrls: ['./article-search.component.css']
})
export class ArticleSearchComponent implements OnInit {
    searchForm: FormGroup;
    articles: ArticleResponse[] = [];
    filteredArticles: ArticleResponse[] = [];
    currentPage = 1;
    itemsPerPage = 6;

    constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) {
        this.searchForm = this.fb.group({
            searchTerm: [''],
            searchType: ['title'],
        });
    }


    ngOnInit(): void {
    }

      searchArticle() {
        if (this.searchForm.valid) {
            const searchTerm = this.searchForm.value.searchTerm;
            const searchType = this.searchForm.value.searchType;

          this.articleService.searchArticle(this.searchForm.value).subscribe({
                  next: (articles) => {
                        this.articles = articles;
                      this.filteredArticles = articles;
                    },
                   error: (err) => {
                      console.log(err);
                    },
                });
              this.filterArticles(searchTerm,searchType)
            }
        }
      get pagedArticles(): ArticleResponse[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredArticles.slice(startIndex, endIndex);
      }

        get totalPages(): number {
            return Math.ceil(this.filteredArticles.length / this.itemsPerPage);
        }

        changePage(page: number) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        }
    navigateToDetails(articleId:number){
      this.router.navigate(['/user/articles', articleId])
    }

       filterArticles(searchTerm: string, searchType: string) {
        this.filteredArticles = this.articles.filter((article) => {
           if(searchType === 'title'){
              return article.title.toLowerCase().includes(searchTerm.toLowerCase());
           } else if(searchType === 'plantName'){
              return article.plante.some(plantId => this.articles.some(article => article.plante.includes(plantId)  &&  article.title.toLowerCase().includes(searchTerm.toLowerCase())))
           }
            return true
          });
        }
}

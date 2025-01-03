import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleResponse } from '../../../../interfaces/article/article-response.interface';
import { ArticleService } from '../../../../services/article.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    articles: ArticleResponse[] = [];
    currentPage = 1;
    itemsPerPage = 6;
    filteredArticles: ArticleResponse[] = [];

    constructor(private articleService: ArticleService, private router: Router, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.getArticle()
     }

     getArticle(){
       this.articleService.getArticles().subscribe({
         next: (articles) => {
           this.articles = articles
             this.filteredArticles = articles
         },
         error: (err) =>{
             console.log(err)
         }
       })
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


}

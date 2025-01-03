import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleResponse } from '../../../../interfaces/article/article-response.interface';
import { CommentaireResponse } from '../../../../interfaces/commentaire/commentaire-response.interface';
import { PlantesResponse } from '../../../../interfaces/plantes/plantes-response.interface';
import { ArticleService } from '../../../../services/article.service';
import { PlantService } from '../../../../services/plant.service';
import { CommentaireRequest } from '../../../../interfaces/commentaire/commentaire-request.interface';

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
    article: ArticleResponse | undefined;
    articleId!: number;
    commentForm!: FormGroup;
    comments: CommentaireResponse[] = [];
    linkedPlants: PlantesResponse[] = [];
    commentLikes: boolean[] = [];

    constructor(private route: ActivatedRoute,
        private articleService: ArticleService,
        private router: Router,
        private plantService: PlantService,
        private fb: FormBuilder) {
        this.commentForm = this.fb.group({
            comment: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.articleId = +params['id'];
            this.getArticleDetails(this.articleId);
            this.getComments(this.articleId);
        });
    }
    getArticleDetails(articleId: number) {
        this.articleService.getArticleById(articleId).subscribe({
            next: (article) => {
                this.article = article
                if (article.plante) {
                    this.loadLinkedPlants(article.plante);
                }
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    loadLinkedPlants(planteIds: number[]) {
        this.plantService.getPlantes().subscribe({
            next: (plants) => {
                this.linkedPlants = plants.filter(plant => planteIds.includes(plant.id))
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
   getComments(articleId: number) {
        this.articleService.getComments(articleId).subscribe({
          next: (response:any) => {
                 if (Array.isArray(response)) {
                     this.comments = response;
                  } else if (response && response.content) {
                      this.comments = response.content;
                 } else {
                    this.comments = [];
                 }
                this.commentLikes = new Array(this.comments.length).fill(false);
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
    postComment() {
        if (this.commentForm.valid) {
            const commentData: CommentaireRequest = this.commentForm.value
            this.articleService.postComments(this.articleId, commentData).subscribe({
                next: (comment) => {
                     this.comments = [...this.comments,comment]
                    this.commentLikes.push(false);
                    this.commentForm.reset();
                },
                error: (err) => {
                    console.log(err)
                }
            })
        }
    }
    toggleLike(index: number) {
        this.commentLikes[index] = !this.commentLikes[index];
    }
    navigateToPlantDetails(plantId: number) {
        this.router.navigate(['/user/plants', plantId])
    }
}

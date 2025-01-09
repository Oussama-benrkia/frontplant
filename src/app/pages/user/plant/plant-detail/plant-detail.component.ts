import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantesResponse } from '../../../../interfaces/plantes/plantes-response.interface';
import { CommentaireResponse } from '../../../../interfaces/commentaire/commentaire-response.interface';
import { PlantService } from '../../../../services/plant.service';
import { CommentaireRequest } from '../../../../interfaces/commentaire/commentaire-request.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-plant-detail',
    templateUrl: './plant-detail.component.html',
    styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {
    plant: PlantesResponse | undefined;
    plantId!: number;
    commentForm!: FormGroup;
    comments: CommentaireResponse[] = [];
    recommendedPlants: PlantesResponse[] = [];
    commentLikes: boolean[] = [];
    loadingRecommendations = false;
    recommendationsLoaded = false;

    constructor(
        private route: ActivatedRoute,
        private plantService: PlantService,
        private fb: FormBuilder,
    ) {
        this.commentForm = this.fb.group({
            comment: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.plantId = +params['id'];
            this.loadPlantData();
            this.getComments(this.plantId);
        });
    }
    loadPlantData() {
        this.plantService.getPlantById(this.plantId).pipe(
            tap((plant) => this.plant = plant),
            switchMap((plant) => {
                if (plant) {
                    return this.loadRecommendations();
                }
                return of(null)
            })
        ).subscribe({
            error: (err) => {
                console.error(err)
            }
        })
    }


    loadRecommendations(): Observable<any> {
        if (!this.plant) {
            return of(null); // Ensure plant is loaded before trying to recommend
        }
        this.loadingRecommendations = true;
        return this.plantService.getPlantes().pipe(
            tap(plants => {
                this.recommendedPlants = plants.filter(p => {
                    if (p.id === this.plant?.id) {
                        return false;
                    }
                    return p.maladies.some(maladieP => this.plant?.maladies.includes(maladieP));
                });
                this.loadingRecommendations = false;
                this.recommendationsLoaded = true;
            }),
            catchError((err) => {
                console.log(err)
                this.loadingRecommendations = false;
                return of(null);
            }),

        )
    }

    getComments(plantId: number) {
          this.plantService.getComments(plantId).subscribe({
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
            const commentData: CommentaireRequest = {
                commentaire:this.commentForm.value.comment
            }
            
            this.plantService.postComments(this.plantId, commentData).subscribe({
                  next: (comment) => {
                      this.comments = [...this.comments, comment];
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
}

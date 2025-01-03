import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantesResponse } from '../../../../interfaces/plantes/plantes-response.interface';
import { ArticleResponse } from '../../../../interfaces/article/article-response.interface';
import { PlantService } from '../../../../services/plant.service';
import { ArticleService } from '../../../../services/article.service';


@Component({
    selector: 'app-plant-search',
    templateUrl: './plant-search.component.html',
    styleUrls: ['./plant-search.component.css']
})
export class PlantSearchComponent {
    searchForm: FormGroup;
    plants: PlantesResponse[] = [];
    articles: ArticleResponse[] = [];
    activeTab: 'plant' | 'article' = 'plant';
    filteredPlants: PlantesResponse[] = [];
    filteredArticles: ArticleResponse[] = [];

    constructor(private fb: FormBuilder, private plantService: PlantService, private articleService: ArticleService) {
        this.searchForm = this.fb.group({
            searchTerm: [''],
            searchType: ['name'], // 'name', 'maladies', 'title'
        });
    }

    searchPlant() {
        if (this.searchForm.valid) {
            const searchTerm = this.searchForm.value.searchTerm;
            const searchType = this.searchForm.value.searchType;

            if (this.activeTab === 'plant') {
                 this.plantService.searchPlant(this.searchForm.value).subscribe({
                    next: (plants) => {
                       this.plants = plants;
                        this.articles = [];
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
               this.filterPlants(searchTerm, searchType)
            } else if (this.activeTab === 'article') {
               this.articleService.searchArticle(this.searchForm.value).subscribe({
                  next: (articles) => {
                        this.articles = articles;
                        this.plants = [];
                    },
                   error: (err) => {
                      console.log(err);
                    },
                });
                 this.filterArticles(searchTerm,searchType)
            }
        }
    }

    setActiveTab(tab: 'plant' | 'article') {
        this.activeTab = tab;
        this.searchForm.patchValue({ searchTerm: '' });
        this.plants = [];
        this.articles = [];
        this.filteredPlants = [];
        this.filteredArticles = [];

        if (tab === 'plant') {
            this.searchForm.patchValue({ searchType: 'name' });
        } else if (tab === 'article') {
            this.searchForm.patchValue({ searchType: 'title' });
        }
    }

        filterPlants(searchTerm: string, searchType: string) {
        this.filteredPlants = this.plants.filter((plant) => {
            if(searchType === 'name'){
               return plant.name.toLowerCase().includes(searchTerm.toLowerCase());
            } else if(searchType === 'maladies'){
              return plant.maladies.some(maladie => maladie.toLowerCase().includes(searchTerm.toLowerCase()));
            }
             return true
          });
        }

          filterArticles(searchTerm: string, searchType: string) {
        this.filteredArticles = this.articles.filter((article) => {
            if(searchType === 'title'){
               return article.title.toLowerCase().includes(searchTerm.toLowerCase());
            }
              return true
          });
        }
}

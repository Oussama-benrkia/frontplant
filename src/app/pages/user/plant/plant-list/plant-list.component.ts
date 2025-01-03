import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlantesResponse } from '../../../../interfaces/plantes/plantes-response.interface';
import { PlantService } from '../../../../services/plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
    plants: PlantesResponse[] = [];
    currentPage = 1;
    itemsPerPage = 6;
    filterForm: FormGroup;
    filteredPlants: PlantesResponse[] = [];

    constructor(private plantService: PlantService, private router: Router, private fb: FormBuilder) {
       this.filterForm = this.fb.group({
            searchTerm: [''],
             searchType: ['name']
       });
    }

    ngOnInit(): void {
        this.getPlant()
     }

     getPlant(){
       this.plantService.getPlantes().subscribe({
         next: (plants) => {
           this.plants = plants
            this.filteredPlants = plants;
         },
         error: (err) =>{
             console.log(err)
         }
       })
     }
     get pagedPlants(): PlantesResponse[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredPlants.slice(startIndex, endIndex);
    }

      get totalPages(): number {
        return Math.ceil(this.filteredPlants.length / this.itemsPerPage);
    }

    changePage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }
    navigateToDetails(plantId:number){
        this.router.navigate(['/user/plants',plantId])
    }

      filterPlants() {
       const searchTerm = this.filterForm.value.searchTerm;
            const searchType = this.filterForm.value.searchType;

        if (searchType === 'name') {
            this.filteredPlants = this.plants.filter(plant =>
                plant.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else if (searchType === 'maladies') {
           this.filteredPlants = this.plants.filter(plant =>
               plant.maladies.some(maladie =>
                   maladie.toLowerCase().includes(searchTerm.toLowerCase())
               )
           );
        } else {
            this.filteredPlants = [...this.plants];
        }
           this.currentPage = 1;
      }
}

import { Component, OnInit } from '@angular/core';
import { Disease } from '../../../models/disease.model';
import { DiseasesService } from '../../../services/admin_serv/diseases.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss']
})
export class DiseasesComponent implements OnInit {
  diseases: Disease[] = [];
  displayedColumns: string[] = ['id', 'name'];

  constructor(private diseasesService: DiseasesService) { }

  ngOnInit(): void {
    console.log('DiseasesComponent initialized');
    this.loadDiseases();
  }

  loadDiseases(): void {
    console.log('Loading diseases...');
    this.diseasesService.getAllDiseases().subscribe({
      next: (data) => {
        console.log('Diseases loaded:', data);
        this.diseases = data;
      },
      error: (error) => {
        console.error('Error loading diseases:', error);
      }
    });
  }
} 
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Plant } from '../../../models/plant.interface';
import { PlantService } from '../../../services/plant.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PlantDialogComponent } from './plant-dialog/plant-dialog.component';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'region', 'utilisation', 'precautions', 'maladies', 'actions'];
  dataSource = new MatTableDataSource<Plant>([]);
  totalElements = 0;
  pageSize = 12;
  currentPage = 0;
  searchTerm = '';
  searchSubject = new Subject<string>();
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private plantService: PlantService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.setupSearch();
  }

  ngOnInit(): void {
    this.loadPlants();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 0;
      this.loadPlants();
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  openAddEditDialog(plant?: Plant): void {
    const dialogRef = this.dialog.open(PlantDialogComponent, {
      data: plant || {},
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPlants();
      }
    });
  }

  loadPlants(): void {
    this.isLoading = true;
    console.log('Loading plants...');
    this.plantService.getPlants(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          console.log('Plants response:', response);
          if (response && response.content) {
            this.dataSource.data = response.content;
            this.totalElements = response.totalElements;
          } else {
            console.error('Invalid response format:', response);
            this.dataSource.data = [];
            this.totalElements = 0;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading plants:', error);
          this.snackBar.open('Error loading plants', 'Close', { duration: 3000 });
          this.isLoading = false;
          this.dataSource.data = [];
          this.totalElements = 0;
        }
      });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPlants();
  }

  deletePlant(id: number): void {
    if (confirm('Are you sure you want to delete this plant?')) {
      this.plantService.deletePlant(id).subscribe({
        next: () => {
          this.snackBar.open('Plant deleted successfully', 'Close', { duration: 3000 });
          this.loadPlants();
        },
        error: (error) => {
          console.error('Error deleting plant:', error);
          this.snackBar.open('Error deleting plant', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getMaladiesString(maladies: string[]): string {
    return maladies ? maladies.join(', ') : '';
  }
} 
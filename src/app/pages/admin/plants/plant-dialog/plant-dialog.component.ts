import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlantService } from '../../../../services/plant.service';
import { Plant } from '../../../../models/plant.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant-dialog',
  templateUrl: './plant-dialog.component.html',
  styleUrls: ['./plant-dialog.component.css']
})
export class PlantDialogComponent {
  form!: FormGroup;
  isEditMode = false;
  selectedFile: File | null = null;
  isSubmitting = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  maladies: string[] = [];

  constructor(
    private fb: FormBuilder,
    private plantService: PlantService,
    private dialogRef: MatDialogRef<PlantDialogComponent>,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Check if user is admin
    const userRole = this.authService.role?.toUpperCase();
    console.log('Current user role:', userRole); // Debug log
    
    if (userRole !== 'ADMIN' && userRole !== 'ROLE_ADMIN') {
      this.snackBar.open('Unauthorized access. Admin privileges required.', 'Close', { duration: 3000 });
      this.dialogRef.close();
      this.router.navigate(['/admin']);
      return;
    }

    this.isEditMode = !!data.id;
    this.maladies = data.maladies || [];
    
    this.form = this.fb.group({
      name: [data.name || '', Validators.required],
      description: [data.description || '', Validators.required],
      region: [data.region || '', Validators.required],
      utilisation: [data.utilisation || '', Validators.required],
      precautions: [data.precautions || '', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  addMaladie(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.maladies.push(value);
    }
    event.chipInput!.clear();
  }

  removeMaladie(maladie: string): void {
    const index = this.maladies.indexOf(maladie);
    if (index >= 0) {
      this.maladies.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formData = new FormData();
      const formValue = this.form.value;

      // Add form fields to FormData
      Object.keys(formValue).forEach(key => {
        if (formValue[key] !== null && formValue[key] !== '') {
          formData.append(key, formValue[key]);
        }
      });

      // Add maladies array
      if (this.maladies.length > 0) {
        this.maladies.forEach(maladie => {
          formData.append('maladies[]', maladie);
        });
      }

      // Add file if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // Log FormData contents for debugging
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      
      const request = this.isEditMode ?
        this.plantService.updatePlant(this.data.id, formData) :
        this.plantService.createPlant(formData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `Plant ${this.isEditMode ? 'updated' : 'created'} successfully`,
            'Close',
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error saving plant:', error);
          let errorMessage = 'An error occurred while saving the plant';
          
          if (error.status === 403) {
            errorMessage = 'You do not have permission to perform this action';
            this.router.navigate(['/admin']);
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
          
          this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
          this.isSubmitting = false;
        }
      });
    }
  }
} 
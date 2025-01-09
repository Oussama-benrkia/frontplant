import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../services/admin_serv/user.service';
import { User } from '../../../../models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {
  form: FormGroup;
  isEditMode: boolean;
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.id;
    this.form = this.fb.group({
      prenom: [data.prenom || '', Validators.required],
      nom: [data.nom || '', Validators.required],
      email: [data.email || '', [Validators.required, Validators.email]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(8)]],
      role: [data.role || 'USER', Validators.required]
    });
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

      // Add file if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      
      const request = this.isEditMode ?
        this.userService.updateUser(this.data.id, formData) :
        this.userService.addUser(formData);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            `User ${this.isEditMode ? 'updated' : 'created'} successfully`,
            'Close',
            { duration: 3000 }
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error saving user:', error);
          let errorMessage = 'An error occurred while saving the user';
          if (error.error?.message) {
            errorMessage = error.error.message;
          }
          this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
} 
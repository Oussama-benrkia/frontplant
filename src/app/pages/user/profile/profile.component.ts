import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { UserResponse } from '../../../interfaces/user/user-response.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserResponse | null = null;
  userData: any = {};
  isDisabled: boolean = true;
  imageToCrop: string | null = null;
  previewImage: string | undefined;  // Variable for the image preview

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUser().subscribe({
      next: (response: UserResponse) => {
        this.user = response;
        // Initialize userData with current profile data
        this.userData = { ...response };
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  onEdit(): void {
    this.isDisabled = false;
  }

  onCancel(): void {
    this.isDisabled = true;
    // Reset userData to original values from the backend
    this.userData = { ...this.user };
  }

  onImageCancel(): void {
    this.imageToCrop = null;  // Clear the image preview
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageToCrop = e.target.result;  // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    for (const key in this.userData) {
      if (this.userData.hasOwnProperty(key)) {
        formData.append(key, this.userData[key]);
      }
    }
    if (this.imageToCrop) {
      // Convert image to blob and append to formData if necessary
      formData.append('file', this.imageToCrop);
    }
    this.profileService.updateUser(formData).subscribe({
      next: (response) => {
        console.log('User updated successfully', response);
        this.isDisabled = true; // Disable the form after successful submission
      },
      error: (error) => {
        console.error('Error updating user data:', error);
      }
    });
  }
  onImageSelect(event: any) {
    this.previewImage = event.target.value;
    this.userData.image = this.previewImage;
  }
}

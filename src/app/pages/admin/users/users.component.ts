import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'image', 'name', 'email', 'role', 'actions'];
  isLoading = true;
  defaultAvatar = 'assets/avatar.png';
  
  constructor(
    public userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.userService.getImageUrl(null);
    }
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().pipe(
      finalize(() => {
        this.isLoading = false;
        console.log('Loading finished, isLoading:', this.isLoading);
      })
    ).subscribe({
      next: (users) => {
        console.log('Raw response:', users);
        this.users = users;
        console.log('Users array after assignment:', this.users);
        console.log('Users array length:', this.users.length);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
        this.snackBar.open('Error loading users. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  openAddEditDialog(user?: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: user || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }
} 
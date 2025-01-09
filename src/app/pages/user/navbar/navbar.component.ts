import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  constructor(private router: Router,private authService:AuthService) {}

  
  navItems = [
    { icon: 'flower2', label: 'Plants', action: () => this.plants() },
    { icon: 'journal-text', label: 'Articles', action: () => this.articles() },
    { icon: 'person-circle', label: 'Profile', action: () => this.profile() },
    { icon: 'file-earmark-plus', label: 'New Article', action: () => this.createArticle() },
    // { icon: 'person-circle', label: 'Profile', action: () => this.profile() },
    { icon: 'box-arrow-right', label: 'Logout', action: () => this.logout() },
  ];
  

  logout() {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['auth/login']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }

  home() {
    this.router.navigate(['/user']);
  }

  // plants() {
  //   this.router.navigate(['/admin/plants']);
  // }

  articles() {
    this.router.navigate(['/user/articles']);
  }
  plants() {
    this.router.navigate(["user/plants"])
  }

  profile() {
    this.router.navigate(['/user/profile'])
  }

  createArticle() {
    this.router.navigate(["user/articles"])
  }
}

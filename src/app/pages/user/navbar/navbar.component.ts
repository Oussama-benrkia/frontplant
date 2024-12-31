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
    { icon: 'house', label: 'Home', action: () => this.home() },
    { icon: 'flower2', label: 'Plants', action: () => this.plants() },
    { icon: 'person-circle', label: 'Profile', action: () => this.profile() },
    { icon: 'file-earmark-plus', label: 'New Article', action: () => this.createArticle() },
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
    console.log("home")
  }

  plants() {
    console.log("plantes")
  }

  profile() {
    console.log("profile")
  }
  createArticle() {
    console.log("profile")
  }
}
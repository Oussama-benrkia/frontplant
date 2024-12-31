import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  constructor(private router: Router) {}

  
  navItems = [
    { icon: 'house', label: 'Home', action: () => this.home() },
    { icon: 'flower2', label: 'Plants', action: () => this.plants() },
    { icon: 'person-circle', label: 'Profile', action: () => this.profile() },
    { icon: 'file-earmark-plus', label: 'New Article', action: () => this.createArticle() },
    { icon: 'box-arrow-right', label: 'Logout', action: () => this.logout() },
  ];
  

  logout() {
    this.router.navigate(['auth/login']);
  }

  home() {
    this.router.navigate(['articles']);
  }

  plants() {
    this.router.navigate(['plants']);
  }

  profile() {
    this.router.navigate(['profile']);
  }
  createArticle() {
    this.router.navigate(['createarticle']);
  }
}

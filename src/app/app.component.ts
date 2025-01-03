import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrigé ici
})
export class AppComponent {
  title = 'frontplant';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      if (this.authService.isAccessTokenExpired()) {
        if (!this.authService.isRefreshTokenExpired()) {
          this.authService.refresh(refreshToken).subscribe({
            next: (response) => {
              this.authService.loadProfile(response.token, response.refreshToken);
              if (this.authService.role === "USER") {
                this.router.navigate(['/user']);
              } else {
                this.router.navigate(['/admin']);
              }
            },
            error: () => {
              this.router.navigate(['/auth/login']);
            }
          });
        } else {
          this.router.navigate(['/auth/login']);
        }
      } else {
        this.redirectBasedOnRole();
      }
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  private redirectBasedOnRole(): void {
    if (this.authService.role === 'USER') {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/admin']);
    }
  }
}

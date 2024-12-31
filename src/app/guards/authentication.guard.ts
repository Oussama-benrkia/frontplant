import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router); // Inject Router to perform navigation

  if (authService.isAuthenticated) { // Corrected property name
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};

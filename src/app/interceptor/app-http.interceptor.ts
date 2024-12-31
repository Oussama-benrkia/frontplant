import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Check if the request URL does not match authentication endpoints
  if (!req.url.includes('/auth/login') && !req.url.includes('/auth/register')) {
    // Clone the request and add the Authorization header
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken),
    });

    return next(newRequest);
  }

  // For authentication routes, pass the request without modification
  return next(req);
};

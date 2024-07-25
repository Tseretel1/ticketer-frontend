
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token && !authService.isTokenExpired(token)) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
export const CreatorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (token) {
    const userRole = authService.getUserRole(token);
    if (userRole === 'Creator') {
      return true;
    } else {
      return false; 
    }
  } else {
    return false;
  }
};

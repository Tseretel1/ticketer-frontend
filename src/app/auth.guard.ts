
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
  const router = inject(Router);
  if (token) {
    const userRole = authService.getUserRole(token);
    if (userRole === 'Creator' || userRole =="User") {
      return true;
    } else {
      router.navigate(['/login']);
      return false; 
    }
  } else {
    return false;
  }
};

export const UserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (token) {
    const userRole = authService.getUserRole(token);
    if (userRole === 'User') {
      return true;
    } else {
      router.navigate(['/login']);
      return false; 
    }
  } else {
    return false;
  }
};

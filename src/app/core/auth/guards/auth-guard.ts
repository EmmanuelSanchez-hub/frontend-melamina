import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const rol = user.rol;

  if (rol === 'ROLE_CLIENTE' && state.url.startsWith('/app')) {
    router.navigate(['/inicio']);
    return false;
  }

  return true;
};

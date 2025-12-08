import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../../core/auth/services/auth';
import { isObservable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  menuOpen = false;
  userMenuOpen = false;

  constructor(private router: Router, private authService: Auth) { }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get username(): string | null {
    const userOrObs = this.authService.getUser();

    // Si es OBJETO → leer username directamente
    if (!isObservable(userOrObs)) {
      return userOrObs?.username ?? null;
    }

    // Si es OBSERVABLE → suscribirse una sola vez
    userOrObs.subscribe((user: any) => {
      console.log(user);
      localStorage.setItem('user', JSON.stringify(user)); // guardar usuario para la próxima vez
      this._username = user.username;
    });

    return this._username ?? null;
  }

  private _username: string | null = null;

  logout() {
    localStorage.clear();
    this.router.navigate(['/registro-publico']);
  }
}
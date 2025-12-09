import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private auth: Auth, private router: Router) { }


  login() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe({
        next: () => {
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const role = user?.rol;
          if (role === 'ROLE_CLIENTE') {
            this.router.navigate(['/inicio']);
          } else {
            this.router.navigate(['/app/dashboard']);
          }
        },
        error: err => console.error(err)
      });
    }
  }
}
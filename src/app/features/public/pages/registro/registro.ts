import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  modoRegistro = false;

  constructor(private http: HttpClient, private router: Router) { }

  toggleModo() {
    this.modoRegistro = !this.modoRegistro;
  }

  //LOGIN
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  // REGISTRO
  registroForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),

    nombres: new FormControl('', [
      Validators.required
    ]),

    apellidos: new FormControl('', [
      Validators.required
    ]),

    telefono: new FormControl('', [
      Validators.pattern(/^[0-9]*$/)
    ]),

    rol: new FormControl('ROLE_CLIENTE', Validators.required)
  });

  login() {
    if (this.loginForm.invalid) return;

    this.http.post(`${environment.apiBaseUrl}/auth/login`, this.loginForm.value)
      .subscribe((resp: any) => {

        localStorage.setItem('token', resp.token);
        localStorage.setItem('rol', resp.rol);
        this.router.navigate(['/landing']);
      });
  }

  registrar() {
    if (this.registroForm.invalid) return;

    this.http.post(`${environment.apiBaseUrl}/auth/registro-publico`, this.registroForm.value)
      .subscribe(() => {
        this.modoRegistro = false;
      });
  }

}
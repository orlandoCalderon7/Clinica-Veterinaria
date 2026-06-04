// src/app/features/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  mostrarPassword = false;
  errorMsg = '';
  cargando = false;

  //  Constructor con inyección de dependencias
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username:   ['r.soria', Validators.required],
      password:   ['12345678', Validators.required],
      recordar:   [false]
    });
  }

  //  Método para alternar la visibilidad de la contraseña
  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  //  Método para manejar el inicio de sesión
  iniciarSesion(): void {
    if (this.form.invalid) return;
    this.cargando = true;
    this.errorMsg = '';

    const { username, password } = this.form.value;

    setTimeout(() => {
      const ok = this.auth.login(username, password);
      this.cargando = false;
      if (ok) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMsg = 'Usuario o contraseña incorrectos.';
      }
    }, 800);
  }
}

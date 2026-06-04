// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Usuario {
  username: string;
  nombre: string;
  rol: string;
  avatar?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuario: Usuario | null = null;

  private usuariosValidos = [
    { username: 'r.soria', password: '12345678', nombre: 'Dr. Ricardo Soria', rol: 'Veterinario' }
  ];

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const found = this.usuariosValidos.find(
      u => u.username === username && u.password === password
    );
    if (found) {
      this.usuario = { username: found.username, nombre: found.nombre, rol: found.rol };
      localStorage.setItem('huellitas_user', JSON.stringify(this.usuario));
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuario = null;
    localStorage.removeItem('huellitas_user');
    this.router.navigate(['/logout']);
  }

  getUsuario(): Usuario | null {
    if (!this.usuario) {
      const stored = localStorage.getItem('huellitas_user');
      if (stored) this.usuario = JSON.parse(stored);
    }
    return this.usuario;
  }

  isLoggedIn(): boolean {
    return !!this.getUsuario();
  }
}

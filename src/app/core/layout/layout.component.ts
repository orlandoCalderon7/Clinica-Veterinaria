// src/app/core/layout/layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';   // ← agrega este import

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

// src/app/core/layout/layout.component.ts
navLinks = [
  { path: '/dashboard', icon: 'home',             label: 'Inicio'               },
  { path: '/mascotas',  icon: 'pets',             label: 'Registro de Mascotas' },
  { path: '/duenos',    icon: 'people',           label: 'Dueños'               },
  { path: '/citas',     icon: 'calendar_month',   label: 'Agenda de Citas'      },
  { path: '/historial', icon: 'medical_services', label: 'Historial Clínico'    },
  { path: '/config',    icon: 'settings',         label: 'Configuración'        }
];

  

  constructor(
    public  auth:      AuthService,
    private router:    Router,
    private uiService: UiService     // ← agrega esto
  ) {}

  cerrarSesion(): void {
    this.auth.logout();
  }

  nuevaCita(): void {
    this.router.navigate(['/citas']).then(() => {
      // Pequeño delay para asegurar que el componente
      // de citas ya está montado antes de emitir el evento
      setTimeout(() => {
        this.uiService.abrirNuevaCita();
      }, 100);
    });
  }
}

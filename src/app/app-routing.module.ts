// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

  // ── Ruta raíz → redirige a login ──────────────
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ── Rutas públicas (login, register, etc.) ────
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module')
        .then(m => m.AuthModule)
  },

  // ── Rutas protegidas dentro del Layout ────────
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'mascotas',
        loadChildren: () =>
          import('./features/mascotas/mascotas.module')
            .then(m => m.MascotasModule)
      },
      {
        path: 'duenos',                              
        loadChildren: () =>
          import('./features/duenos/duenos.module')
            .then(m => m.DuenosModule)
      },
      {
        path: 'citas',
        loadChildren: () =>
          import('./features/citas/citas.module')
            .then(m => m.CitasModule)
      },
      {
        path: 'historial',
        loadChildren: () =>
          import('./features/historial/historial.module')
            .then(m => m.HistorialModule)
      }
    ]
  },

  // ── Wildcard ──────────────────────────────────
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// src/app/features/mascotas/mascotas-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotasComponent }    from './mascotas.component';
import { MascotaListComponent } from './components/mascota-list/mascota-list.component';
import { MascotaFormComponent } from './components/mascota-form/mascota-form.component';

const routes: Routes = [
  {
    path: '',
    component: MascotasComponent,       // ← shell con <router-outlet>
    children: [
      { path: '',       component: MascotaListComponent },  // /mascotas
      { path: 'nuevo',  component: MascotaFormComponent },  // /mascotas/nuevo
      { path: 'editar/:id', component: MascotaFormComponent } // /mascotas/editar/1
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule {}

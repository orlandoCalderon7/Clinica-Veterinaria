// src/app/features/historial/historial-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialListComponent } from './historial-list/historial-list.component';
import { HistorialFormComponent } from './historial-form/historial-form.component';

const routes: Routes = [
  { path: '',          component: HistorialListComponent },
  { path: 'nueva',     component: HistorialFormComponent },
  { path: 'editar/:id', component: HistorialFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRoutingModule {}

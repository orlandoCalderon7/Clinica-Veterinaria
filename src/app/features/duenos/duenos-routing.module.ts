// src/app/features/duenos/duenos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuenosComponent } from './duenos.component';

const routes: Routes = [
  { path: '', component: DuenosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuenosRoutingModule {}

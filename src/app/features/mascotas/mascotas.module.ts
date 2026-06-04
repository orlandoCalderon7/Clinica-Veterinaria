// src/app/features/mascotas/mascotas.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MascotasRoutingModule } from './mascotas-routing.module';
import { MascotasComponent }    from './mascotas.component';
import { MascotaListComponent } from './components/mascota-list/mascota-list.component';
import { MascotaFormComponent } from './components/mascota-form/mascota-form.component';

@NgModule({
  declarations: [
    MascotasComponent,
    MascotaListComponent,
    MascotaFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MascotasRoutingModule
  ]
})
export class MascotasModule {}

// src/app/features/citas/citas.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { SharedModule } from '../../shared/shared.module'; // ← FIX clave

@NgModule({
  declarations: [
    CitasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CitasRoutingModule,
    SharedModule  // ← esto expone estadoCita pipe y resaltarCita directive
  ]
})
export class CitasModule {}

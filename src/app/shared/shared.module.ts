// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoCitaPipe } from './pipes/estado-cita.pipe';
import { ResaltarCitaDirective } from './directives/resaltar-cita.directive';

@NgModule({
  declarations: [
    EstadoCitaPipe,
    ResaltarCitaDirective
  ],
  imports: [CommonModule],
  exports: [
    EstadoCitaPipe,
    ResaltarCitaDirective
  ]
})
export class SharedModule {}

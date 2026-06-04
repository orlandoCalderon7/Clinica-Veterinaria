// src/app/features/historial/historial.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HistorialRoutingModule }  from './historial-routing.module';
import { HistorialListComponent }  from './historial-list/historial-list.component';
import { HistorialFormComponent }  from './historial-form/historial-form.component';
import { HistorialComponent }      from './historial.component';

// HttpClientModule eliminado — ya no se necesita
@NgModule({
  declarations: [
    HistorialComponent,
    HistorialListComponent,
    HistorialFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HistorialRoutingModule
  ]
})
export class HistorialModule {}

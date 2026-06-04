// src/app/features/duenos/duenos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DuenosRoutingModule } from './duenos-routing.module';
import { DuenosComponent } from './duenos.component';

@NgModule({
  declarations: [DuenosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DuenosRoutingModule
  ],
  exports: [DuenosComponent]
})
export class DuenosModule {}

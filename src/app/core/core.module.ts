// src/app/core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { UiService } from './services/ui.service';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,       // ← habilita routerLink y router-outlet
    HttpClientModule
  ],
  exports: [
    LayoutComponent,
    RouterModule,       // ← lo expone hacia AppModule
    HttpClientModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) throw new Error('CoreModule: solo importar en AppModule.');
  }
}

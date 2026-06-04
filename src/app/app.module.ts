// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent          // ← solo AppComponent aquí
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule            // ← trae RouterModule + LayoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

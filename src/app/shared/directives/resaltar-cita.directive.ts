// src/app/shared/directives/resaltar-cita.directive.ts
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { EstadoCita } from '../../features/citas/models/cita.model';

@Directive({
  selector: '[appResaltarCita]'
})
export class ResaltarCitaDirective implements OnInit {
  @Input() appResaltarCita: EstadoCita = 'pendiente';

  private colores: Record<EstadoCita, string> = {
    pendiente:  '#fff3cd',
    confirmada: '#d4edda',
    cancelada:  '#f8d7da',
    completada: '#d1ecf1'
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const color = this.colores[this.appResaltarCita] ?? '#ffffff';
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '6px');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '8px');
  }
}

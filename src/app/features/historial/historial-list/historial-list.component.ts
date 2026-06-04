// src/app/features/historial/historial-list/historial-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../services/historial.service';
import { Consulta } from '../models/consulta.model';

@Component({
  selector: 'app-historial-list',
  templateUrl: './historial-list.component.html',
  styleUrls: ['./historial-list.component.scss']
})
export class HistorialListComponent implements OnInit {

  consultas: Consulta[] = [];
  cargando = true;
  consultaAEliminar: number | null = null;

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    this.cargarConsultas();
  }

  cargarConsultas(): void {
    this.cargando = true;
    this.historialService.getAll().subscribe({
      next: (data) => {
        this.consultas = data;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  confirmarEliminar(id: number): void {
    this.consultaAEliminar = id;
  }

  eliminar(): void {
    if (this.consultaAEliminar === null) return;
    this.historialService.eliminar(this.consultaAEliminar).subscribe({
      next: () => {
        this.consultas = this.consultas.filter(c => c.id !== this.consultaAEliminar);
        this.consultaAEliminar = null;
      }
    });
  }

  cancelarEliminar(): void {
    this.consultaAEliminar = null;
  }
}

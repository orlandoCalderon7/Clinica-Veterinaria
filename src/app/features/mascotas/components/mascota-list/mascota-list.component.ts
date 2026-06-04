// src/app/features/mascotas/mascota-list/mascota-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotaService }  from '../../services/mascota.service';
import { CitaService }     from '../../../citas/services/cita.service'; 
import { MascotaConDueno } from '../../models/mascota.model';

// Extendemos la interfaz solo para la vista
export interface MascotaConVeterinario extends MascotaConDueno {
  veterinarioAsignado?: string;  // viene de la última cita
}

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrls: ['./mascota-list.component.scss']
})
export class MascotaListComponent implements OnInit {

  mascotas: MascotaConVeterinario[] = [];

  constructor(
    private mascotaService: MascotaService,
    private citaService:    CitaService,   
    private router:         Router
  ) {}

  ngOnInit(): void {
    const todasLasCitas = this.citaService.obtenerTodas();

    this.mascotas = this.mascotaService.getAllConDueno().map(mascota => {

      // Busca la última cita que coincida por nombre de mascota
      const citasDeLaMascota = todasLasCitas
        .filter(c =>
          c.mascotaNombre.toLowerCase().trim() ===
          mascota.nombre.toLowerCase().trim()
        )
        .sort((a, b) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );

      const ultimaCita = citasDeLaMascota[0];

      return {
        ...mascota,
        veterinarioAsignado: ultimaCita?.veterinario || undefined
      };
    });
  }

  nueva(): void {
    this.router.navigate(['/mascotas/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/mascotas/editar', id]);
  }
}

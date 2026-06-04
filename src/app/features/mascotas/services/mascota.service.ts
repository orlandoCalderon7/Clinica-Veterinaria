// src/app/features/mascotas/services/mascota.service.ts
import { Injectable } from '@angular/core';
import { Mascota, MascotaConDueno } from '../models/mascota.model';
import { DuenoService } from '../../duenos/services/dueno.service';

@Injectable({ providedIn: 'root' })
export class MascotaService {

  private readonly STORAGE_KEY = 'huellitas_mascotas';

  // Datos iniciales de ejemplo (solo se usan si localStorage está vacío)
  private mascotasIniciales: Mascota[] = [
    { id: 1, nombre: 'Máximo',  especie: 'perro', raza: 'Labrador',  edad: 3, peso: 28,  genero: 'macho',  duenoId: 1, veterinario: 'Dr. García'  },
    { id: 2, nombre: 'Luna',    especie: 'gato',  raza: 'Siamés',    edad: 2, peso: 4,   genero: 'hembra', duenoId: 1, veterinario: 'Dra. Torres' },
    { id: 3, nombre: 'Avenida', especie: 'ave',   raza: 'Periquito', edad: 1, peso: 0.1, genero: 'macho',  duenoId: 2, veterinario: 'Dr. García'  },
  ];

  private mascotas: Mascota[] = [];

  constructor(private duenoService: DuenoService) {
    this.mascotas = this.cargarDesdeStorage();
  }

  // ── localStorage ───────────────────────────────────────

  private cargarDesdeStorage(): Mascota[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      // Si no hay nada guardado, usa los datos iniciales y los persiste
      if (!data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.mascotasIniciales));
        return [...this.mascotasIniciales];
      }
      return JSON.parse(data) as Mascota[];
    } catch {
      return [...this.mascotasIniciales];
    }
  }

  private guardarEnStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.mascotas));
  }

  // ── Lectura ────────────────────────────────────────────

  getAll(): Mascota[] {
    return this.mascotas;
  }

  getAllConDueno(): MascotaConDueno[] {
    return this.mascotas.map(m => ({
      ...m,
      dueno: this.duenoService.getById(m.duenoId)
    }));
  }

  getByDuenoId(duenoId: number): Mascota[] {
    return this.mascotas.filter(m => m.duenoId === duenoId);
  }

  getById(id: number): Mascota | undefined {
    return this.mascotas.find(m => m.id === id);
  }

  obtenerPorId(id: number): Mascota | undefined {
    return this.getById(id);
  }

  // ── Escritura ──────────────────────────────────────────

  agregar(mascota: Mascota): void {
    mascota.id = Date.now();
    this.mascotas.push({ ...mascota });
    this.guardarEnStorage(); // persiste
  }

  actualizar(mascota: Mascota): void {
    const idx = this.mascotas.findIndex(m => m.id === mascota.id);
    if (idx >= 0) {
      this.mascotas[idx] = { ...mascota };
      this.guardarEnStorage(); // persiste
    }
  }

  save(mascota: Mascota): void {
    const idx = this.mascotas.findIndex(m => m.id === mascota.id);
    if (idx >= 0) {
      this.mascotas[idx] = { ...mascota };
    } else {
      mascota.id = Date.now();
      this.mascotas.push({ ...mascota });
    }
    this.guardarEnStorage(); // persiste
  }

  delete(id: number): void {
    this.mascotas = this.mascotas.filter(m => m.id !== id);
    this.guardarEnStorage(); // persiste
  }

  eliminar(id: number): void {
    this.delete(id);
  }
}

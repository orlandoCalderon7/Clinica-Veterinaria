// src/app/features/historial/models/consulta.model.ts

export interface Consulta {
  id?: number;
  mascotaId: number;
  nombreMascota?: string;
  fecha: string;
  motivo: string;
  diagnostico: string;
  tratamiento: string;
  peso: number;
  temperatura?: number;
  observaciones?: string;
  veterinario: string;
}

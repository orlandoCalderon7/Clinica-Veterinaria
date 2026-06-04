// src/app/features/citas/models/cita.model.ts

// ← Exporta el tipo como alias nombrado
export type EstadoCita = 'pendiente' | 'confirmada' | 'completada' | 'cancelada';

export interface Cita {
  id:              number;
  mascotaNombre:   string;
  mascotaRaza?:    string;
  mascotaEdad?:    number;
  motivo:          string;
  veterinario:     string;
  consultorio?:    string;
  fecha:           Date;
  hora:            string;
  estado:          EstadoCita;   // ← usa el tipo nombrado
}

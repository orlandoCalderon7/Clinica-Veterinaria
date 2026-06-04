// src/app/features/duenos/models/dueno.model.ts
export interface Dueno {
  id:        number;
  nombre:    string;
  apellidos: string;
  dni:       string;
  telefono:  string;
  direccion: string;
  email?:     string;
}

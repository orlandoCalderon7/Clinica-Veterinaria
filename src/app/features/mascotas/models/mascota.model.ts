// src/app/features/mascotas/models/mascota.model.ts
import { Dueno } from '../../duenos/models/dueno.model';

export interface Mascota {
  id:           number;
  nombre:       string;
  especie:      'perro' | 'gato' | 'ave' | 'otro';
  raza:         string;
  edad:         number;
  peso?:        number;
  genero:       'macho' | 'hembra';
  duenoId:      number;
  veterinario?: string;   
  notas?:       string;
}

export interface MascotaConDueno extends Mascota {
  dueno?: Dueno;
}

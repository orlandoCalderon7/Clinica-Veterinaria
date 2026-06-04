// src/app/features/citas/services/cita.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService {

  private _citas: Cita[] = [
    {
      id: 1, mascotaNombre: 'Max', mascotaRaza: 'Vacuna', mascotaEdad: 2,
      motivo: 'Vacuna', veterinario: 'Dr. Mendez', consultorio: 'Consultorio A',
      fecha: new Date(2023, 9, 2), hora: '09:00', estado: 'confirmada'
    },
    {
      id: 2, mascotaNombre: 'Toby', mascotaRaza: 'Golden Retriever', mascotaEdad: 3,
      motivo: 'Cirugía Programada', veterinario: 'Dr. Mendez', consultorio: 'Quirófano A',
      fecha: new Date(2023, 9, 6), hora: '10:00', estado: 'confirmada'
    },
    {
      id: 3, mascotaNombre: 'Luna', mascotaRaza: 'Siamés', mascotaEdad: 2,
      motivo: 'Chequeo', veterinario: 'Dra. López', consultorio: 'Consultorio B',
      fecha: new Date(2023, 9, 6), hora: '14:30', estado: 'pendiente'
    },
    {
      id: 4, mascotaNombre: 'Mochi', mascotaRaza: 'Gato Persa', mascotaEdad: 1,
      motivo: 'Baño y Corte', veterinario: 'Estilista: Sofía', consultorio: 'Grooming 2',
      fecha: new Date(2023, 9, 6), hora: '16:00', estado: 'pendiente'
    },
    {
      id: 5, mascotaNombre: 'Coco', mascotaRaza: 'Pug', mascotaEdad: 4,
      motivo: 'Control Antipulgas', veterinario: 'Dr. García', consultorio: 'Consultorio A',
      fecha: new Date(2023, 9, 6), hora: '17:30', estado: 'pendiente'
    },
    {
      id: 6, mascotaNombre: 'Rex', mascotaRaza: 'Pastor Alemán', mascotaEdad: 5,
      motivo: 'Control', veterinario: 'Dra. López', consultorio: 'Consultorio B',
      fecha: new Date(2023, 9, 15), hora: '08:30', estado: 'pendiente'
    }
  ];

  private _subject = new BehaviorSubject<Cita[]>(this._citas);
  citas$ = this._subject.asObservable();

  obtenerTodas(): Cita[] {
    return this._citas;
  }

  obtenerPorFecha(fecha: Date): Cita[] {
    return this._citas.filter(c =>
      c.fecha.getFullYear() === fecha.getFullYear() &&
      c.fecha.getMonth()    === fecha.getMonth()    &&
      c.fecha.getDate()     === fecha.getDate()
    );
  }

  agregar(cita: Cita): void {
    const nueva = { ...cita, id: Date.now() };
    this._citas = [...this._citas, nueva];
    this._subject.next(this._citas);
  }

  actualizar(citaEditada: Cita): void {
    this._citas = this._citas.map(c =>
      c.mascotaNombre          === citaEditada.mascotaNombre &&
      c.fecha.toDateString()   === citaEditada.fecha.toDateString() &&
      c.hora                   === citaEditada.hora
        ? { ...citaEditada }
        : c
    );
    this._subject.next(this._citas);
  }

  cancelar(id: number): void {
    this._citas = this._citas.map(c =>
      c.id === id ? { ...c, estado: 'cancelada' } : c
    );
    this._subject.next(this._citas);
  }

} // ← llave de cierre de la clase

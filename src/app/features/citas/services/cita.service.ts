import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cita } from '../models/cita.model';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({ providedIn: 'root' })
export class CitaService {

  private readonly STORAGE_KEY = 'huellitas_citas';

  // Datos iniciales de ejemplo (solo si localStorage está vacío)
  private citasIniciales: Cita[] = [
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

  private _citas: Cita[] = [];
  private _subject = new BehaviorSubject<Cita[]>(this._citas);
  citas$ = this._subject.asObservable();

  constructor(private storageService: StorageService) {
    this._citas = this.cargarDesdeStorage();
    this._subject.next(this._citas);
  }

  // ── localStorage ───────────────────────────────────────

  private cargarDesdeStorage(): Cita[] {
    try {
      const data = this.storageService.getItem<Cita[]>(this.STORAGE_KEY);
      // Si no hay nada guardado, usa los datos iniciales y los persiste
      if (!data || data.length === 0) {
        this.storageService.setItem(this.STORAGE_KEY, this.citasIniciales);
        return [...this.citasIniciales];
      }
      // Convertir strings de fecha a objetos Date
      return data.map(c => ({
        ...c,
        fecha: new Date(c.fecha)
      }));
    } catch (error) {
      console.error('Error al cargar citas:', error);
      return [...this.citasIniciales];
    }
  }

  private guardarEnStorage(): void {
    this.storageService.setItem(this.STORAGE_KEY, this._citas);
  }

  // ── Lectura ────────────────────────────────────────

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

  // ── Escritura ──────────────────────────────────────

  agregar(cita: Cita): void {
    const nueva = { ...cita, id: Date.now() };
    this._citas = [...this._citas, nueva];
    this._subject.next(this._citas);
    this.guardarEnStorage(); 
  }

  actualizar(citaEditada: Cita): void {
    
    const index = this._citas.findIndex(c => c.id === citaEditada.id);
    
    if (index !== -1) {
      this._citas[index] = { ...citaEditada };
    } else {
      // Si no existe por ID, intenta el método anterior (compatibilidad)
      this._citas = this._citas.map(c =>
        c.mascotaNombre          === citaEditada.mascotaNombre &&
        c.fecha.toDateString()   === citaEditada.fecha.toDateString() &&
        c.hora                   === citaEditada.hora
          ? { ...citaEditada }
          : c
      );
    }
    
    this._subject.next([...this._citas]);
    this.guardarEnStorage(); 
  }

  cancelar(id: number): void {
    this._citas = this._citas.map(c =>
      c.id === id ? { ...c, estado: 'cancelada' } : c
    );
    this._subject.next(this._citas);
    this.guardarEnStorage(); 
  }

} 

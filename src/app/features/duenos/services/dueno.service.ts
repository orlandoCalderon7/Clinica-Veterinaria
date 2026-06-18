import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dueno } from '../models/dueno.model';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({ providedIn: 'root' })
export class DuenoService {

  private readonly STORAGE_KEY = 'huellitas_duenos';

  // Datos iniciales de ejemplo
  private duenosIniciales: Dueno[] = [
    { id: 1, nombre: 'Ricardo', apellidos: 'Soria',  dni: '12345678', telefono: '999111222', direccion: 'Av. Lima 123',  email: 'ricardo@email.com' },
    { id: 2, nombre: 'María',   apellidos: 'García', dni: '87654321', telefono: '999333444', direccion: 'Jr. Cusco 456', email: 'maria@email.com'   },
  ];

  // Array privado con guión bajo
  private _duenos: Dueno[] = [];

  // BehaviorSubject
  private duenos$$ = new BehaviorSubject<Dueno[]>(this._duenos);
  duenos$ = this.duenos$$.asObservable();

  constructor(private storageService: StorageService) {
    this._duenos = this.cargarDesdeStorage();
    this.duenos$$.next(this._duenos);
  }

  // ── localStorage ───────────────────────────────────────

  private cargarDesdeStorage(): Dueno[] {
    try {
      const data = this.storageService.getItem<Dueno[]>(this.STORAGE_KEY);
      // Si no hay nada guardado, usa los datos iniciales y los persiste
      if (!data || data.length === 0) {
        this.storageService.setItem(this.STORAGE_KEY, this.duenosIniciales);
        return [...this.duenosIniciales];
      }
      return data;
    } catch (error) {
      console.error('Error al cargar dueños:', error);
      return [...this.duenosIniciales];
    }
  }

  private guardarEnStorage(): void {
    this.storageService.setItem(this.STORAGE_KEY, this._duenos);
  }

  // ── Lectura ────────────────────────────────────────

  getAll(): Dueno[] {
    return this._duenos;
  }

  getById(id: number): Dueno | undefined {
    return this._duenos.find(d => d.id === id);
  }

  // buscar() — filtra por nombre, apellidos o DNI
  buscar(termino: string): Dueno[] {
    const t = termino.toLowerCase().trim();
    if (!t) return this._duenos;
    return this._duenos.filter(d =>
      d.nombre.toLowerCase().includes(t)    ||
      d.apellidos.toLowerCase().includes(t) ||
      d.dni.includes(t)
    );
  }

  // ── Escritura ──────────────────────────────────────

  // agregar() — crea nuevo dueño y notifica
  agregar(dueno: Dueno): void {
    const nuevo = { ...dueno, id: Date.now() };
    this._duenos.push(nuevo);
    this.duenos$$.next([...this._duenos]);
    this.guardarEnStorage(); 
  }

  // actualizar() — edita dueño existente y notifica
  actualizar(dueno: Dueno): void {
    const idx = this._duenos.findIndex(d => d.id === dueno.id);
    if (idx >= 0) {
      this._duenos[idx] = { ...dueno };
      this.duenos$$.next([...this._duenos]);
      this.guardarEnStorage(); 
    }
  }

  // eliminar() — borra por id y notifica
  eliminar(id: number): void {
    this._duenos = this._duenos.filter(d => d.id !== id);
    this.duenos$$.next([...this._duenos]);
    this.guardarEnStorage(); 
  }

  // ──  (compatibilidad con MascotaService) ───

  save(dueno: Dueno): void {
    dueno.id ? this.actualizar(dueno) : this.agregar(dueno);
  }

  delete(id: number): void {
    this.eliminar(id);
  }
}

// src/app/features/duenos/services/dueno.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dueno } from '../models/dueno.model';

@Injectable({ providedIn: 'root' })
export class DuenoService {

  //  Array privado con guión bajo — nombre consistente en todo el archivo
  private _duenos: Dueno[] = [
    { id: 1, nombre: 'Ricardo', apellidos: 'Soria',  dni: '12345678', telefono: '999111222', direccion: 'Av. Lima 123',  email: 'ricardo@email.com' },
    { id: 2, nombre: 'María',   apellidos: 'García', dni: '87654321', telefono: '999333444', direccion: 'Jr. Cusco 456', email: 'maria@email.com'   },
  ];

  // BehaviorSubject apunta a _duenos (antes apuntaba a this._duenos sin existir)
  private duenos$$ = new BehaviorSubject<Dueno[]>(this._duenos);
  duenos$ = this.duenos$$.asObservable();

  // ── Lectura ────────────────────────────────────────

  getAll(): Dueno[] {
    return this._duenos;
  }

  getById(id: number): Dueno | undefined {
    return this._duenos.find(d => d.id === id);
  }

  //  buscar() — filtra por nombre, apellidos o DNI
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

  //  agregar() — crea nuevo dueño y notifica
  agregar(dueno: Dueno): void {
    const nuevo = { ...dueno, id: Date.now() };
    this._duenos.push(nuevo);
    this.duenos$$.next([...this._duenos]);
  }

  // actualizar() — edita dueño existente y notifica
  actualizar(dueno: Dueno): void {
    const idx = this._duenos.findIndex(d => d.id === dueno.id);
    if (idx >= 0) {
      this._duenos[idx] = { ...dueno };
      this.duenos$$.next([...this._duenos]);
    }
  }

  // eliminar() — borra por id y notifica
  eliminar(id: number): void {
    this._duenos = this._duenos.filter(d => d.id !== id);
    this.duenos$$.next([...this._duenos]);
  }

  // ── Alias en inglés (compatibilidad con MascotaService) ───

  save(dueno: Dueno): void {
    dueno.id ? this.actualizar(dueno) : this.agregar(dueno);
  }

  delete(id: number): void {
    this.eliminar(id);
  }
}

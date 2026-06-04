// src/app/features/historial/services/historial.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Consulta } from '../models/consulta.model';

@Injectable({ providedIn: 'root' })
export class HistorialService {

  private readonly KEY = 'historial_consultas';

  // ── Helpers localStorage ──────────────────────────────

  private leer(): Consulta[] {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private escribir(consultas: Consulta[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(consultas));
  }

  private nuevoId(consultas: Consulta[]): number {
    return consultas.length > 0
      ? Math.max(...consultas.map(c => c.id ?? 0)) + 1
      : 1;
  }

  // ── API pública (misma firma que antes → sin cambios en componentes) ──

  getAll(): Observable<Consulta[]> {
    return of(this.leer());
  }

  getByMascota(mascotaId: number): Observable<Consulta[]> {
    const resultado = this.leer().filter(
      c => Number(c.mascotaId) === mascotaId
    );
    return of(resultado);
  }

  getById(id: number): Observable<Consulta> {
    const consulta = this.leer().find(c => c.id === Number(id));
    return of(consulta!);
  }

  crear(consulta: Consulta): Observable<Consulta> {
    const lista = this.leer();
    const nueva: Consulta = { ...consulta, id: this.nuevoId(lista) };
    this.escribir([...lista, nueva]);
    return of(nueva);
  }

  actualizar(id: number, consulta: Consulta): Observable<Consulta> {
    const lista = this.leer().map(c =>
      c.id === Number(id) ? { ...consulta, id: Number(id) } : c
    );
    this.escribir(lista);
    return of({ ...consulta, id: Number(id) });
  }

  eliminar(id: number): Observable<void> {
    this.escribir(this.leer().filter(c => c.id !== Number(id)));
    return of(void 0);
  }
}

// src/app/features/duenos/duenos.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DuenoService } from './services/dueno.service';
import { Dueno } from './models/dueno.model';

@Component({
  selector: 'app-duenos',
  templateUrl: './duenos.component.html',
  styleUrls: ['./duenos.component.scss']
})
export class DuenosComponent implements OnInit, OnDestroy {

  // ── Lista ──────────────────────────────────────
  duenos:          Dueno[] = [];
  duenosFiltrados: Dueno[] = [];
  terminoBusqueda  = '';

  // ── Modal ──────────────────────────────────────
  modalAbierto  = false;
  modoEdicion   = false;
  duenoEditando: Dueno | null = null;
  formDueno!:   FormGroup;
  guardando     = false;

  // ── Detalle ────────────────────────────────────
  duenoDetalle: Dueno | null = null;

  private subs = new Subscription();

  constructor(
    private duenoService: DuenoService,
    private fb:           FormBuilder
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.duenoService.duenos$.subscribe(duenos => {
        this.duenos          = duenos;
        this.duenosFiltrados = duenos;
      })
    );
    this.inicializarForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Formulario ─────────────────────────────────
  inicializarForm(dueno?: Dueno): void {
    this.formDueno = this.fb.group({
      nombre:    [dueno?.nombre    ?? '', [Validators.required, Validators.minLength(2)]],
      apellidos: [dueno?.apellidos ?? '', [Validators.required, Validators.minLength(2)]],
      dni:       [dueno?.dni       ?? '', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      telefono:  [dueno?.telefono  ?? '', [Validators.required]],
      direccion: [dueno?.direccion ?? ''],
      email:     [dueno?.email     ?? '', [Validators.email]]
    });
  }

  // ── Modal ──────────────────────────────────────
  abrirModalNuevo(): void {
    this.modoEdicion   = false;
    this.duenoEditando = null;
    this.inicializarForm();
    this.modalAbierto  = true;
  }

  abrirModalEditar(dueno: Dueno): void {
    this.modoEdicion   = true;
    this.duenoEditando = dueno;
    this.inicializarForm(dueno);
    this.modalAbierto  = true;
  }

  cerrarModal(): void {
    this.modalAbierto  = false;
    this.guardando     = false;
    this.duenoEditando = null;
  }

  // ── Guardar ────────────────────────────────────
  guardarDueno(): void {
    if (this.formDueno.invalid) {
      this.formDueno.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const v = this.formDueno.value;

    if (this.modoEdicion && this.duenoEditando) {
      this.duenoService.actualizar({ ...this.duenoEditando, ...v });
    } else {
      this.duenoService.agregar(v);
    }

    this.cerrarModal();
  }

  // ── Eliminar ───────────────────────────────────
  eliminarDueno(id: number): void {
    if (confirm('¿Eliminar este dueño? Esta acción no se puede deshacer.')) {
      this.duenoService.eliminar(id);
      if (this.duenoDetalle?.id === id) this.duenoDetalle = null;
    }
  }

  // ── Búsqueda ───────────────────────────────────
  buscar(): void {
    this.duenosFiltrados = this.duenoService.buscar(this.terminoBusqueda);
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.duenosFiltrados = this.duenos;
  }

  // ── Detalle ────────────────────────────────────
  verDetalle(dueno: Dueno): void {
    this.duenoDetalle = this.duenoDetalle?.id === dueno.id ? null : dueno;
  }

  // ── Helpers ────────────────────────────────────
  isInvalid(campo: string): boolean {
    const ctrl = this.formDueno.get(campo);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  iniciales(dueno: Dueno): string {
    return (dueno.nombre[0] + dueno.apellidos[0]).toUpperCase();
  }
}

// src/app/features/historial/historial-form/historial-form.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HistorialService } from '../services/historial.service';
import { MascotaService }   from '../../mascotas/services/mascota.service';
import { CitaService }      from '../../citas/services/cita.service';
import { Mascota }          from '../../mascotas/models/mascota.model';

@Component({
  selector: 'app-historial-form',
  templateUrl: './historial-form.component.html',
  styleUrls: ['./historial-form.component.scss']
})
export class HistorialFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  esEdicion    = false;
  consultaId?: number;
  guardando    = false;
  mascotas: Mascota[] = [];

  // Flags de autocompletado para mostrar badge visual
  pesoAutocompletado = false;
  vetAutocompletado  = false;

  private subs = new Subscription();

  constructor(
    private fb:               FormBuilder,
    private historialService: HistorialService,
    private mascotaService:   MascotaService,
    private citaService:      CitaService,
    private route:            ActivatedRoute,
    private router:           Router
  ) {}

  ngOnInit(): void {
    // Cargar lista de mascotas para el selector
    this.mascotas = this.mascotaService.getAll();

    // Construir formulario
    this.form = this.fb.group({
      mascotaId:     [null, Validators.required],
      fecha:         ['',   Validators.required],
      motivo:        ['',   Validators.required],
      diagnostico:   ['',   Validators.required],
      tratamiento:   ['',   Validators.required],
      peso:          [null, [Validators.required, Validators.min(0.1)]],
      temperatura:   [null],
      observaciones: [''],
      veterinario:   ['',   Validators.required]
    });

    // Escuchar cambio de mascota → autocompletar peso y veterinario
    this.subs.add(
      this.form.get('mascotaId')!.valueChanges.subscribe(id => {
        if (id) this.autocompletar(Number(id));
      })
    );

    // Modo edición: cargar datos existentes
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.consultaId = Number(idParam);
      this.esEdicion  = true;
      this.historialService.getById(this.consultaId).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  // Autocompletar peso desde MascotaService
  //    Autocompletar veterinario desde CitaService (última cita)
  private autocompletar(mascotaId: number): void {
    this.pesoAutocompletado = false;
    this.vetAutocompletado  = false;

    const mascota = this.mascotaService.getById(mascotaId);
    if (!mascota) return;

    // ── Peso ─────────────────────────────────────────────
    if (mascota.peso != null) {
      this.form.patchValue({ peso: mascota.peso });
      this.pesoAutocompletado = true;
    }

    // ── Veterinario (última cita de esa mascota) ─────────
    const ultimaCita = this.citaService
      .obtenerTodas()
      .filter(c =>
        c.mascotaNombre.toLowerCase().trim() ===
        mascota.nombre.toLowerCase().trim()
      )
      .sort((a, b) =>
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      )[0];

    if (ultimaCita?.veterinario) {
      this.form.patchValue({ veterinario: ultimaCita.veterinario });
      this.vetAutocompletado = true;
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.guardando = true;

    const mascota = this.mascotaService.getById(
      Number(this.form.value.mascotaId)
    );

    const consulta = {
      ...this.form.value,
      nombreMascota: mascota?.nombre || ''
    };

    const accion = this.esEdicion
      ? this.historialService.actualizar(this.consultaId!, consulta)
      : this.historialService.crear(consulta);

    accion.subscribe({
      next:  () => this.router.navigate(['/historial']),
      error: () => { this.guardando = false; }
    });
  }

  cancelar(): void {
    this.router.navigate(['/historial']);
  }

  campo(name: string) {
    return this.form.get(name);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

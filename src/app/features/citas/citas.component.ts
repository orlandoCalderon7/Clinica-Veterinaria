// src/app/features/citas/citas.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CitaService }    from './services/cita.service';
import { Cita }           from './models/cita.model';
import { UiService }      from '../../core/services/ui.service';
import { MascotaService } from '../mascotas/services/mascota.service';
import { Mascota }        from '../mascotas/models/mascota.model';
import { Subscription }   from 'rxjs';

// Validador fuera de la clase — evalúa fecha + hora juntos
export function fechaHoraFuturaValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const fecha = group.get('fecha')?.value;
    const hora  = group.get('hora')?.value;
    if (!fecha || !hora) return null;
    const fechaHoraCita = new Date(`${fecha}T${hora}:00`);
    return fechaHoraCita < new Date() ? { fechaPasada: true } : null;
  };
}

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit, OnDestroy {

  // ── Calendario ────────────────────────────────
  hoy             = new Date();
  mesActual       = new Date();
  diaSeleccionado = new Date();
  vistaActiva: 'mes' | 'semana' | 'dia' = 'mes';
  diasCalendario: (Date | null)[] = [];

  nombresMeses = [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];

  // ── Citas ─────────────────────────────────────
  todasLasCitas: Cita[] = [];

  // ── Mascotas ──────────────────────────────────
  mascotas: Mascota[] = [];
  mascotaSeleccionada: Mascota | null = null;

  // ── Modal ─────────────────────────────────────
  modalAbierto  = false;
  modoEdicion   = false;
  citaEditando: Cita | null = null;
  formCita!: FormGroup;
  guardando     = false;

  private subs = new Subscription();

  constructor(
    private citaService:    CitaService,
    private fb:             FormBuilder,
    private uiService:      UiService,
    private mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.citaService.citas$.subscribe(citas => {
        this.todasLasCitas = citas;
      })
    );

    this.subs.add(
      this.uiService.abrirModal$.subscribe(() => this.abrirModal())
    );

    this.mascotas = this.mascotaService.getAll();
    this.generarCalendario();
    this.inicializarForm();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── Formulario ────────────────────────────────
  inicializarForm(): void {
    const hoyStr = this.formatearFechaInput(new Date());
    this.formCita = this.fb.group(
      {
        mascotaId:     [null],
        mascotaNombre: ['', [Validators.required, Validators.minLength(2)]],
        mascotaRaza:   [''],
        mascotaEdad:   [null],
        motivo:        ['', Validators.required],
        veterinario:   ['', Validators.required],
        consultorio:   [''],
        fecha:         [hoyStr, Validators.required],
        hora:          ['09:00', Validators.required],
        estado:        ['pendiente']
      },
      //  Validador de grupo: bloquea fechas/horas pasadas
      { validators: fechaHoraFuturaValidator() }
    );
  }

  //  Getter para usar en el template fácilmente
  get fechaPasada(): boolean {
    return this.formCita?.hasError('fechaPasada') ?? false;
  }

  onMascotaChange(event: Event): void {
    const id = +(event.target as HTMLSelectElement).value;
    const mascota = this.mascotas.find(m => m.id === id) || null;
    this.mascotaSeleccionada = mascota;

    if (mascota) {
      this.formCita.patchValue({
        mascotaNombre: mascota.nombre,
        mascotaRaza:   mascota.raza        || '',
        mascotaEdad:   mascota.edad        || null,
        veterinario:   mascota.veterinario || ''
      });
    } else {
      this.formCita.patchValue({
        mascotaNombre: '',
        mascotaRaza:   '',
        mascotaEdad:   null,
        veterinario:   ''
      });
    }
  }

  // ── Modal: NUEVA cita ─────────────────────────
  abrirModal(): void {
    this.modoEdicion         = false;
    this.citaEditando        = null;
    this.mascotaSeleccionada = null;
    this.mascotas            = this.mascotaService.getAll();
    this.inicializarForm();
    this.formCita.patchValue({
      fecha: this.formatearFechaInput(this.diaSeleccionado)
    });
    this.modalAbierto = true;
  }

  // ── Modal: EDITAR cita ────────────────────────
  abrirModalEdicion(cita: Cita): void {
    this.modoEdicion         = true;
    this.citaEditando        = cita;
    this.mascotaSeleccionada = null;
    this.mascotas            = this.mascotaService.getAll();
    this.inicializarForm();

    this.formCita.patchValue({
      mascotaId:     null,
      mascotaNombre: cita.mascotaNombre,
      mascotaRaza:   cita.mascotaRaza   || '',
      mascotaEdad:   cita.mascotaEdad   || null,
      motivo:        cita.motivo,
      veterinario:   cita.veterinario,
      consultorio:   cita.consultorio   || '',
      fecha:         this.formatearFechaInput(cita.fecha),
      hora:          cita.hora,
      estado:        cita.estado
    });

    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto        = false;
    this.guardando           = false;
    this.modoEdicion         = false;
    this.citaEditando        = null;
    this.mascotaSeleccionada = null;
  }

  // ── Guardar: crea o actualiza según modo ──────
  guardarCita(): void {
    if (this.formCita.invalid) {
      this.formCita.markAllAsTouched();
      return;
    }

    //  Bloqueo extra por seguridad (aunque el botón ya está disabled)
    if (this.fechaPasada) return;

    this.guardando = true;
    const val = this.formCita.value;

    if (this.modoEdicion && this.citaEditando) {
      const citaActualizada: Cita = {
        ...this.citaEditando,
        mascotaNombre: val.mascotaNombre,
        mascotaRaza:   val.mascotaRaza   || undefined,
        mascotaEdad:   val.mascotaEdad   || undefined,
        motivo:        val.motivo,
        veterinario:   val.veterinario,
        consultorio:   val.consultorio   || undefined,
        fecha:         new Date(val.fecha + 'T00:00:00'),
        hora:          val.hora,
        estado:        val.estado
      };
      this.citaService.actualizar(citaActualizada);
      this.diaSeleccionado = citaActualizada.fecha;
      this.mesActual = new Date(
        citaActualizada.fecha.getFullYear(),
        citaActualizada.fecha.getMonth(), 1
      );
    } else {
      const nuevaCita: Cita = {
        id:            Date.now(),
        mascotaNombre: val.mascotaNombre,
        mascotaRaza:   val.mascotaRaza   || undefined,
        mascotaEdad:   val.mascotaEdad   || undefined,
        motivo:        val.motivo,
        veterinario:   val.veterinario,
        consultorio:   val.consultorio   || undefined,
        fecha:         new Date(val.fecha + 'T00:00:00'),
        hora:          val.hora,
        estado:        val.estado
      };
      this.citaService.agregar(nuevaCita);
      this.diaSeleccionado = nuevaCita.fecha;
      this.mesActual = new Date(
        nuevaCita.fecha.getFullYear(),
        nuevaCita.fecha.getMonth(), 1
      );
    }

    this.generarCalendario();
    this.cerrarModal();
  }

  isInvalid(campo: string): boolean {
    const ctrl = this.formCita.get(campo);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  // ── Navegación del calendario ─────────────────
  mesAnterior(): void {
    this.mesActual = new Date(this.mesActual.getFullYear(), this.mesActual.getMonth() - 1, 1);
    this.generarCalendario();
  }

  mesSiguiente(): void {
    this.mesActual = new Date(this.mesActual.getFullYear(), this.mesActual.getMonth() + 1, 1);
    this.generarCalendario();
  }

  generarCalendario(): void {
    const año    = this.mesActual.getFullYear();
    const mes    = this.mesActual.getMonth();
    const primer = new Date(año, mes, 1);
    const ultimo  = new Date(año, mes + 1, 0);

    let offset = primer.getDay() - 1;
    if (offset < 0) offset = 6;

    this.diasCalendario = [
      ...Array(offset).fill(null),
      ...Array.from({ length: ultimo.getDate() }, (_, i) => new Date(año, mes, i + 1))
    ];
  }

  seleccionarDia(dia: Date | null): void {
    if (dia) this.diaSeleccionado = dia;
  }

  citasDelDia(dia: Date | null): Cita[] {
    if (!dia) return [];
    return this.todasLasCitas.filter(c =>
      c.estado !== 'cancelada'                    &&
      c.fecha.getFullYear() === dia.getFullYear() &&
      c.fecha.getMonth()    === dia.getMonth()    &&
      c.fecha.getDate()     === dia.getDate()
    );
  }

  get citasHoy(): Cita[] {
    return this.citasDelDia(this.diaSeleccionado)
               .sort((a, b) => a.hora.localeCompare(b.hora));
  }

  get totalCitas(): number {
    return this.todasLasCitas.filter(c => c.estado !== 'cancelada').length;
  }

  get totalVacunas(): number {
    return this.todasLasCitas.filter(c =>
      c.motivo.toLowerCase().includes('vacuna') && c.estado !== 'cancelada'
    ).length;
  }

  cancelarCita(id: number): void {
    this.citaService.cancelar(id);
  }

  esHoy(dia: Date | null): boolean {
    if (!dia) return false;
    return dia.toDateString() === this.hoy.toDateString();
  }

  esSeleccionado(dia: Date | null): boolean {
    if (!dia) return false;
    return dia.toDateString() === this.diaSeleccionado.toDateString();
  }

  nombreDia(fecha: Date): string {
    return ['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'][fecha.getDay()];
  }

  avatarEspecie(raza: string = ''): string {
    const r = raza.toLowerCase();
    if (r.includes('gato') || r.includes('siamés') || r.includes('persa')) return '🐱';
    if (r.includes('perro') || r.includes('golden') || r.includes('labrador')) return '🐶';
    return '🐾';
  }

  formatearFechaInput(fecha: Date): string {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, '0');
    const d = String(fecha.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

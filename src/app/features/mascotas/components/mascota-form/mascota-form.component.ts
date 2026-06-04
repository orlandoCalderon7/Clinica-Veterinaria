import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { DuenoService }   from '../../../duenos/services/dueno.service';
import { Dueno }          from '../../../duenos/models/dueno.model';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.scss']
})
export class MascotaFormComponent implements OnInit {

  form!: FormGroup;
  esEdicion  = false;
  mascotaId?: number;
  duenos: Dueno[] = [];

  // Lista centralizada de veterinarios (igual que en citas)
  veterinarios: string[] = [
    'Dr. García',
    'Dra. López',
    'Dr. Mendez',
    'Dra. Torres',
    'Estilista: Sofía'
  ];

  constructor(
    private fb:           FormBuilder,
    private service:      MascotaService,
    private duenoService: DuenoService,
    private router:       Router,
    private route:        ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.duenos = this.duenoService.getAll();

    this.form = this.fb.group({
      nombre:      ['', Validators.required],
      especie:     ['', Validators.required],
      raza:        [''],
      edad:        [null],
      peso:        [null],
      genero:      ['macho'],
      duenoId:     [null, Validators.required],
      veterinario: ['']   
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.mascotaId = +id;
      const mascota = this.service.obtenerPorId(this.mascotaId);
      if (mascota) this.form.patchValue(mascota); 
    }
  }

  setGenero(valor: string): void {
    this.form.get('genero')?.setValue(valor);
  }

  isInvalid(campo: string): boolean {
    const ctrl = this.form.get(campo);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.esEdicion && this.mascotaId) {
      this.service.actualizar({ ...this.form.value, id: this.mascotaId });
    } else {
      this.service.agregar(this.form.value);
    }
    this.router.navigate(['/mascotas']);
  }

  cancelar(): void {
    this.router.navigate(['/mascotas']);
  }
}

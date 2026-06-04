// src/app/shared/pipes/estado-cita.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from '../../features/citas/models/cita.model';

@Pipe({ name: 'estadoCita' })
export class EstadoCitaPipe implements PipeTransform {

  transform(estado: EstadoCita): string {
    const mapa: Record<EstadoCita, string> = {
      pendiente:   ' Pendiente',
      confirmada:  ' Confirmada',
      completada:  ' Completada',
      cancelada:   ' Cancelada'
    };
    return mapa[estado] ?? estado;
  }
}

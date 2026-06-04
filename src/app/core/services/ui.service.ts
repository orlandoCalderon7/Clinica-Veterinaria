// src/app/core/services/ui.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  private _abrirModal = new Subject<void>();
  abrirModal$ = this._abrirModal.asObservable();

  abrirNuevaCita(): void {
    this._abrirModal.next();
  }
}

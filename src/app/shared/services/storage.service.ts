import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  // Guardar datos en localStorage
  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

  // Obtener datos de localStorage
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error al obtener de localStorage:', error);
      return null;
    }
  }

  // Eliminar un item
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al eliminar de localStorage:', error);
    }
  }

  // Limpiar todo
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  }
}

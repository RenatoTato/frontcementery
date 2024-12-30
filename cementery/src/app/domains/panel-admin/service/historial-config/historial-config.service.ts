import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorialConfigService {
  private commonFields = {
    dateRange: [
      { name: 'start_date', label: 'Fecha de Inicio', type: 'date' },
      { name: 'end_date', label: 'Fecha de Fin', type: 'date' },
    ],
    historyType: {
      name: 'history_type',
      label: 'Acciones',
      type: 'select',
      options: [
        { value: '', label: 'Todas' },
        { value: '+', label: 'Creación' },
        { value: '~', label: 'Actualización' },
        { value: '-', label: 'Eliminación' }
      ]
    },
    user: {
      name: 'user',
      label: 'Usuario',
      type: 'select',
      options: [
        { value: '', label: 'Todos los Usuarios' },
        { value: 1, label: 'Renato Carvajal' },
        { value: 2, label: 'Priscila Rodríguez' },
        { value: 3, label: 'Fernando Abdón' },
        { value: 4, label: 'Livingston Olivares' },
        { value: 5, label: 'Tato Admin' },
      ]
    }
  };

  private configs: Record<string, any> = {
    servicio: {
      fields: [
        ...this.commonFields.dateRange,
        { name: 'entity_id', label: 'ID del Servicio', type: 'text' },
        { name: 'numberTomb', label: 'Numero de tumba', type: 'text' },
        { name: 'deceased', label: 'Difunto', type: 'text' },
        {
          name: 'ceremony', label: 'Ceremonia', type: 'select', options: [
            { value: '', label: 'Todas las Ceremonias' }, // Opción inicial vacía
            { value: 'Cremacion', label: 'Cremación' },
            { value: 'Inhumacion', label: 'Inhumación' },
            { value: 'Exhumacion', label: 'Exhumación' },
            { value: 'Conmemoracion', label: 'Conmemoración' },
            { value: 'Mantenimiento', label: 'Mantenimiento' }
          ]
        },
        this.commonFields.historyType, // Campo de tipo de acción
        this.commonFields.user // Campo de usuario
      ]
    },
    difunto: {
      fields: [
        ...this.commonFields.dateRange,
        { name: 'entity_id', label: 'ID de Difunto', type: 'number' },
        { name: 'names', label: 'Nombres', type: 'text' },
        { name: 'last_names', label: 'Apellidos', type: 'text' },
        { name: 'idNumber', label: 'Cédula', type: 'text' },
        { name: 'requestNumber', label: 'Número de Solicitud', type: 'text' },
        { name: 'deudo', label: 'Deudo' , type: 'text' },
        this.commonFields.historyType, // Campo de tipo de acción
        this.commonFields.user // Campo de usuario
      ]
    },
    deudo: {
      fields: [
        ...this.commonFields.dateRange,
        { name: 'entity_id', label: 'ID del Deudo', type: 'number' },
        { name: 'names', label: 'Nombres', type: 'text' },
        { name: 'last_names', label: 'Apellidos', type: 'text' },
        { name: 'idNumber', label: 'Cédula', type: 'text' },
        { name: 'phoneNumber', label: 'Teléfono', type: 'text' },
        { name: 'address', label: 'Dirección', type: 'text' },
        {
          name: 'tipo', label: 'Relación', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 'Allegado', label: 'Allegado' },
            { value: 'Familiar', label: 'Familiar' },
            { value: 'Conocido', label: 'Conocido' }
          ]
        },
        this.commonFields.historyType, // Campo de tipo de acción
        this.commonFields.user // Campo de usuario
      ]
    },
    lote: {
      fields: [
        ...this.commonFields.dateRange,
        { name: 'entity_id', label: 'ID del Lote', type: 'number' },
        {
          name: 'blockName', label: 'Bloque', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
            { value: 6, label: '6' },
            { value: 7, label: '7' },
            { value: 8, label: '8' },
            { value: 9, label: '9' },
            { value: 10, label: '10' },
            { value: 11, label: '11' },
            { value: 12, label: '12' },
          ]
        },
        {
          name: 'typeblock', label: 'Tipo de Bloque', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
            { value: 'C', label: 'C' },
            { value: 'D', label: 'D' },
            { value: 'F', label: 'F' },
            { value: 'H', label: 'H' },
            { value: 'G', label: 'G' },
            { value: 'J', label: 'J' },
            { value: 'L', label: 'L' },
            { value: 'M', label: 'M' },
            { value: 'N', label: 'N' },
            { value: 'S', label: 'S' },
            { value: 'T', label: 'T' }
          ]
        },
        {
          name: 'numbersblock', label: 'Número de Bloques', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
            { value: 6, label: '6' },
            { value: 7, label: '7' },
            { value: 8, label: '8' },
            { value: 9, label: '9' }
          ]
        },
        {
          name: 'filas', label: 'Filas', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' }
          ]
        },
        {
          name: 'columnas', label: 'Columnas', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 4, label: '4' },
            { value: 7, label: '7' },
            { value: 9, label: '9' },
            { value: 11, label: '11' },
            { value: 13, label: '13' },
            { value: 14, label: '14' },
            { value: 17, label: '17' },
            { value: 20, label: '20' },
            { value: 21, label: '21' }
          ]
        },
        {
          name: 'limite', label: 'Límite de Ocupación', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 13, label: '13' },
            { value: 16, label: '16' },
            { value: 17, label: '17' },
            { value: 20, label: '20' },
            { value: 28, label: '28' },
            { value: 36, label: '36' },
            { value: 44, label: '44' },
            { value: 56, label: '56' },
            { value: 70, label: '70' },
            { value: 105, label: '105' },
          ]
        },
        this.commonFields.historyType, // Campo de tipo de acción
        this.commonFields.user // Campo de usuario
      ]
    },
    tumba: {
      fields: [
        ...this.commonFields.dateRange,
        { name: 'entity_id', label: 'ID del Deudo', type: 'number' },
        { name: 'nicheNumber', label: 'Número de Nicho', type: 'text' },
        { name: 'nameLote', label: 'Lote', type: 'text' },
        {
          name: 'nicheType', label: 'Tipo de Nicho', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 'T', label: 'Tierra' },
            { value: 'E', label: 'Estructura' }
          ]
        },
        {
          name: 'available', label: 'Disponibilidad', type: 'select', options: [
            { value: '', label: 'Todos' },
            { value: 'true', label: 'Disponible' },
            { value: 'false', label: 'Ocupado' }
          ]
        },
        this.commonFields.historyType, // Campo de tipo de acción
        this.commonFields.user // Campo de usuario
      ]
    },
    // Agrega más configuraciones para lote, tumba, deudo, etc.
  };

  getConfig(entity: string): any {
    return this.configs[entity];
  }
  
}

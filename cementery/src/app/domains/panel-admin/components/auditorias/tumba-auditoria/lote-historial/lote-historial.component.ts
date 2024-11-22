import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TumbaHistoryService } from '@admin/service/tumba-history/tumba-history.service';
import { LoteHistory } from '@admin/models/tumba/loteh.model';
import { VersionCambio } from '@admin/models/cambios/comparar.model';

@Component({
  selector: 'app-lote-historial',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './lote-historial.component.html',
  styleUrl: './lote-historial.component.css'
})
export class LoteHistorialComponent implements OnInit {
    historialItems: LoteHistory[] = [];
    totalItems: number = 0;
    currentPage: number = 1;
    pageSize: number = 17;
    comparacion: VersionCambio[] = [];
    filterForm: FormGroup;
    defaultObjectId: number = 1;
    // Campos de filtros y encabezados
    filterFields = [
      { name: 'start_date', label: 'Fecha de Inicio' },
      { name: 'end_date', label: 'Fecha de Fin' },
      { name: 'entity_id', label: 'ID del Lote' },
      { name: 'blockName', label: 'Bloque' },
      { name: 'typeblock', label: 'Tipo de Bloque' },
      { name: 'numbersblock', label: 'Número de Bloques' },
      { name: 'filas', label: 'Filas' },
      { name: 'columnas', label: 'Columnas' },
      { name: 'limite', label: 'Límite de Ocupación' },
      { name: 'history_type', label: 'Acciones' },
      { name: 'user', label: 'Usuario' }
    ];
  
    filterOptions = {
      history_type: [
        { value: '', label: 'Todas las Acciones' },
        { value: '+', label: 'Creación' },
        { value: '~', label: 'Actualización' },
        { value: '-', label: 'Eliminación' }
      ],
      typeblock: [
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
      ],
      blockName: [
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
      ],
      numbersblock: [
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
      ],
      user: [
        { value: '', label: 'Todos los Usuarios' },
        { value: 1, label: 'Renato Carvajal' },
        { value: 2, label: 'Priscila Rodríguez' },
        { value: 3, label: 'Fernando Abdón' },
        { value: 4, label: 'Livingston Olivares' },
        { value: 5, label: 'Tato Admin' },
      ],
    };
  
    tableHeaders = [
      'Usuario',
      'ID Lote',
      'Bloque',
      'Tipo de Bloque',
      'Número de Bloques',
      'Filas',
      'Columnas',
      'Límite de Ocupación',
      'Fecha de Creación',
      'Fecha de Modificación',
      'Acción',
      'Fecha del Cambio'
    ];
    constructor(
      private fb: FormBuilder,
      private loteHistoryService: TumbaHistoryService,
      private cdRef: ChangeDetectorRef
    ) {
      this.filterForm = this.fb.group({
        start_date: [''],
        end_date: [''],
        entity_id: [''],
        blockName: [''],
        typeblock: [''],
        numbersblock: [''],
        filas: [''],
        columnas: [''],
        limite: [''],
        history_type: [''],
        user: ['']
      });
    }
  
    ngOnInit(): void {
      this.loadHistorial(this.currentPage, this.pageSize); // Cargar todo el historial al inicio  

    }
  
    loadHistorial(page: number = 1, pageSize: number = 10): void {
      const filterParams = this.filterForm.value;
  
      this.loteHistoryService.getLoteHistorials(page, pageSize, filterParams).subscribe(response => {
        this.historialItems = response.results;
        this.totalItems = response.count;
  
        this.compararVersiones(this.defaultObjectId);
      }, error => {
        console.error('Error al cargar el historial:', error);
      });
    }
    
    campoLabels: { [key: string]: string } = {
      history_id: 'ID de Historial',
      history_user: 'Usuario',
      id: 'ID de Lote',
      loadDate: 'Fecha de Creación',
      updateDate: 'Fecha de Actualización',
      description: 'Descripción',
      blockName: 'Nombre del Bloque',
      typeblock: 'Tipo de Bloque',
      numbersblock: 'Número de Bloques',
      filas: 'Número de Filas',
      columnas: 'Número de Columnas',
      limite: 'Límite de Ocupación',
      history_date: 'Fecha de Modificación',
      history_change_reason: 'Razón del Cambio',
      history_type: 'Acción'
     };
    // Mapear valores para history_type
    mapHistoryType(type: string): string {
      const typeMap: { [key: string]: string } = {
        '+': 'Creación',
        '~': 'Actualización',
        '-': 'Eliminación'
      };
      return typeMap[type] || type;
    }
    
    mapUser(userId: string | undefined): string {
      const userMap: { [key: string]: string } = {
        'renato': 'Renato',
        'pricila': 'Priscila Rodríguez',
        'deudo': 'Fernando Abdón',
        'liviston': 'Livingston Olivares',
        'tato': 'Tato Dany'
      };
      return userId ? userMap[userId] || userId : 'Desconocido';
    }
  
    // Comparar versiones
  
  
    // Comparar versiones para un objeto específico desde la acción en la tabla
    compararVersiones(objectId: number): void {
      this.loteHistoryService.compareLoteVersions(objectId).subscribe(
        (data) => {
          this.comparacion = data.cambios; // Actualiza la lista de comparaciones
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al comparar versiones:', error)
      );
    }
  
  
  
    // Restaurar una versión específica
    restaurarVersion(versionId: number): void {
      this.loteHistoryService.restoreLoteVersion(versionId).subscribe(
        (response) => {
          console.log('Restauración exitosa:', response);
          this.loadHistorial(this.currentPage, this.pageSize); // Recargar el historial después de restaurar
        },
        (error) => console.error('Error al restaurar la versión:', error)
      );
    }
  
  
    // Paginación
    get totalPages(): number {
      return Math.ceil(this.totalItems / this.pageSize);
    }
  
    nextPage(step: number): void {
      const newPage = this.currentPage + step;
      if (newPage <= this.totalPages) {
        this.currentPage = newPage;
        this.loadHistorial(this.currentPage, this.pageSize);
      }
    }
  
    previousPage(step: number): void {
      const newPage = this.currentPage - step;
      if (newPage >= 1) {
        this.currentPage = newPage;
        this.loadHistorial(this.currentPage, this.pageSize);
      }
    }
  
    goToFirstPage(): void {
      this.currentPage = 1;
      this.loadHistorial(this.currentPage, this.pageSize);
    }
  
    goToLastPage(): void {
      this.currentPage = this.totalPages;
      this.loadHistorial(this.currentPage, this.pageSize);
    }
    resetFilters(): void {
      this.filterForm.reset();
      this.loadHistorial(1, this.pageSize);
    }
  }
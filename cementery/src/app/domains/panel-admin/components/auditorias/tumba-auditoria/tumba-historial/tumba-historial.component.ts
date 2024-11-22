import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TumbaHistoryService } from '@admin/service/tumba-history/tumba-history.service';
import { TumbaHistory, } from '@admin/models/tumba/tumbah.model';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { TumbaService } from '@externo/services/tumba.service';
import { Lote } from '@externo/models/tumba/lote.model';
import { FilterOption } from '@admin/models/tumba/tumbaop.model';

@Component({
  selector: 'app-tumba-historial',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tumba-historial.component.html',
  styleUrl: './tumba-historial.component.css'
})
export class TumbaHistorialComponent implements OnInit {

  historialItems: TumbaHistory[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 17;
  lotes: Lote[] = [];
  loteDetails?: string;
  comparacion: VersionCambio[] = [];
  filterForm: FormGroup;
  defaultObjectId: number = 1;
  loteNamesCache: { [key: number]: string } = {}; // Mapa de caché para nombres de lotes
  // Campos de filtros y encabezados
  filterFields = [
    { name: 'start_date', label: 'Fecha de Inicio' },
    { name: 'end_date', label: 'Fecha de Fin' },
    { name: 'entity_id', label: 'ID de Tumba' },
    { name: 'nicheNumber', label: 'Número de Nicho' },
    { name: 'nicheType', label: 'Tipo de Nicho' },
    { name: 'available', label: 'Disponibilidad' },
    { name: 'nameLote', label: 'Lote' },
    { name: 'history_type', label: 'Acciones' },
    { name: 'user', label: 'Usuario' }
  ];
  filterOptions: {
    history_type: FilterOption[];
    nicheType: FilterOption[];
    available: FilterOption[];
    user: FilterOption[];
    nicheNumber: FilterOption[];
  } = {
      history_type: [
        { value: '', label: 'Todas las Acciones' },
        { value: '+', label: 'Creación' },
        { value: '~', label: 'Actualización' },
        { value: '-', label: 'Eliminación' }
      ],
      nicheType: [
        { value: '', label: 'Todos' },
        { value: 'T', label: 'Tierra' },
        { value: 'E', label: 'Estructura' }
      ],
      available: [
        { value: '', label: 'Todos' },
        { value: 'true', label: 'Disponible' },
        { value: 'false', label: 'Ocupado' }
      ],
      user: [
        { value: '', label: 'Todos los Usuarios' },
        { value: 1, label: 'Renato Carvajal' },
        { value: 2, label: 'Priscila Rodríguez' },
        { value: 3, label: 'Fernando Abdón' },
        { value: 4, label: 'Livingston Olivares' },
        { value: 5, label: 'Tato Admin' }
      ],
      nicheNumber: [], // Inicialización vacía
    };

  tableHeaders = [
    'Usuario',
    'ID Tumba',
    'Número de Nicho',
    'Tipo de Nicho',
    'Disponible',
    'Lote',
    'Fecha de Creación',
    'Fecha de Modificación',
    'Tipo de Cambio',
    'Fecha accion',
  ];
  constructor(
    private fb: FormBuilder,
    private tumbaHistoryService: TumbaHistoryService,
    private tumbaService: TumbaService,
    private cdRef: ChangeDetectorRef // Inyectamos ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      start_date: [''],
      end_date: [''],
      entity_id: [''],
      nicheNumber: [''],
      nicheType: [''],
      available: [''],
      nameLote: [''],
      history_type: [''],
      user: ['']
    });
  }
  obtenerNombreLote(id: number | string | true): string {
    // Asegúrate de que id es un número antes de continuar
    if (typeof id !== 'number') {
      return 'N/A'; // O el valor predeterminado en caso de un tipo no válido
    }

    // Si ya tenemos el nombre en la caché, lo retornamos directamente
    if (this.loteNamesCache[id]) {
      return this.loteNamesCache[id];
    }

    // De lo contrario, llamamos al servicio para obtener el nombre del lote
    this.tumbaService.getLoteId(id).subscribe(
      lote => {
        this.loteNamesCache[id] = `${lote.blockName} ${lote.typeblock} ${lote.numbersblock}`;
      },
      error => {
        console.error(`Error al cargar el nombre del lote con ID ${id}:`, error);
        this.loteNamesCache[id] = 'N/A'; // Valor predeterminado si falla la carga
      }
    );

    // Retorna un valor temporal mientras se carga el nombre del lote
    return this.loteNamesCache[id] || 'Cargando...';
  }

  ngOnInit(): void {
    this.loadHistorial(this.currentPage, this.pageSize); // Cargar todo el historial al inicio  
    this.loadlotes();
    this.initializeNicheNumbers();
  }
  initializeNicheNumbers(): void {
    this.filterOptions.nicheNumber = Array.from({ length: 105 }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}`
    }));
  }
  loadlotes(): void {
    this.tumbaService.getReadLotes().subscribe(
      (lotes: Lote[]) => {
        this.lotes = lotes;
        console.log('lote:', this.lotes);
      },
      (error) => console.error('Error al obtener las tumbas:', error)
    );
  }

  loadHistorial(page: number = 1, pageSize: number = 10): void {
    const filterParams = this.filterForm.value;

    this.tumbaHistoryService.getTumbaHistorials(page, pageSize, filterParams).subscribe(response => {
      this.historialItems = response.results;
      this.totalItems = response.count;

      this.historialItems.forEach((item) => {
        if (item.nameLote && typeof item.nameLote === 'number') {
          this.tumbaService.getLoteId(item.nameLote).subscribe(
            (lote: Lote) => {
              this.loteDetails = `${lote.blockName} - ${lote.typeblock} (${lote.numbersblock})`;
            },
            (error) => {
              console.error(`Error al cargar el lote para la tumba con ID ${item.id}:`, error);
              this.loteDetails = 'Información no disponible';
            }
          );
        }
      });

      this.compararVersiones(this.defaultObjectId);
    }, error => {
      console.error('Error al cargar el historial:', error);
    });
  }

  campoLabels: { [key: string]: string } = {
    history_id: 'ID de Historial',
    history_user: 'Usuario',
    id: 'ID de Tumba',
    loadDate: 'Fecha de Creación',
    updateDate: 'Fecha de Actualización',
    description: 'Descripción',
    nicheNumber: 'Número de Nicho',
    nicheType: 'Tipo de Nicho',
    available: 'Disponibilidad',
    history_date: 'Fecha de Modificación',
    history_type: 'Acción',
    nameLote: 'Nombre del Lote'
    // Añade otros campos necesarios aquí si es necesario
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
    this.tumbaHistoryService.compareTumbaVersions(objectId).subscribe(
      (data) => {
        this.comparacion = data.cambios; // Actualiza la lista de comparaciones
        this.cdRef.detectChanges();
      },
      (error) => console.error('Error al comparar versiones:', error)
    );
  }



  // Restaurar una versión específica
  restaurarVersion(versionId: number): void {
    this.tumbaHistoryService.restoreTumbaVersion(versionId).subscribe(
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
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DifuntoHistoryService } from '@admin/service/difunto-history/difunto-history.service';
import { DifuntoHistory } from '@admin/models/difunto/difuntoh.model';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { DifuntoService } from '@externo/services/difunto.service';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { Difunto } from '@externo/models/difunto/difunto.model';

@Component({
  selector: 'app-difunto-historial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './difunto-historial.component.html',
  styleUrl: './difunto-historial.component.css'
})
export class DifuntoHistorialComponent implements OnInit {

  historialItems: DifuntoHistory[] = [];
  difuntos:Difunto[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 17;
  deudos: Deudo[] = [];
  comparacion: VersionCambio[] = [];
  filterForm: FormGroup;
  defaultObjectId: number = 1;
  deudoNamesCache: { [key: number]: string } = {}; // Mapa de caché para nombres de deudos
  showFilters:boolean=false;

  // Campos de filtros y encabezados
  filterFields = [
    { name: 'start_date', label: 'Fecha de Inicio' },
    { name: 'end_date', label: 'Fecha de Fin' },
    { name: 'entity_id', label: 'ID de Difunto' },
    { name: 'names', label: 'Nombres del Difunto' },
    { name: 'last_names', label: 'Apellidos del Difunto' },
    { name: 'idNumber', label: 'Cédula' },
    { name: 'requestNumber', label: 'Número de Solicitud' },
    { name: 'deudo', label: 'Deudo' },
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
      { value: 5, label: 'Tato Admin' },
    ],
  };

  tableHeaders = [
    'Usuario',
    'ID Difunto',
    'Nombres',
    'Apellidos',
    'Cédula',
    'Número de Solicitud',
    'Deudo',
    'Fecha de Creación',
    'Fecha de Modificación',
    'Tipo de Cambio',
    'Fecha Acción'
  ];

  constructor(
    private fb: FormBuilder,
    private difuntoHistoryService: DifuntoHistoryService,
    private difuntoService: DifuntoService,
    private cdRef: ChangeDetectorRef // Inyectamos ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      start_date: [''],
      end_date: [''],
      entity_id: [''],
      names: [''],
      last_names: [''],
      idNumber: [''],
      requestNumber: [''],
      deudo: [''],
      history_type: [''],
      user: ['']
    });
  }
  obtenerNombreDeudo(id: number | string | true): string {
    if (typeof id !== 'number') {
      return 'N/A';
    }

    if (this.deudoNamesCache[id]) {
      return this.deudoNamesCache[id];
    }

    this.difuntoService.getDeudoId(id).subscribe(
      (deudo: Deudo) => {
        this.deudoNamesCache[id] = `${deudo.names} ${deudo.last_names}`;
      },
      (error) => {
        console.error(`Error al cargar el deudo con ID ${id}:`, error);
        this.deudoNamesCache[id] = 'N/A';
      }
    );

    return this.deudoNamesCache[id] || 'Cargando...';
  }

  ngOnInit(): void {
    this.loadHistorial(this.currentPage, this.pageSize); // Cargar todo el historial al inicio  
    this.loadDeudos();
    this.loadDifuntos();
  }
  loadDeudos(): void {
    this.difuntoService.getReadDeudos().subscribe(
      (deudos: Deudo[]) => {
        this.deudos = deudos;
        console.log('deudo:', this.deudos);
      },
      (error) => console.error('Error al obtener las difuntos:', error)
    );
  }
  loadDifuntos(): void {
    this.difuntoService.getReadDifuntos().subscribe(
      (difuntos: Difunto[]) => {
        this.difuntos = difuntos;
        console.log('difunto:', this.difuntos);
      },
      (error) => console.error('Error al obtener las difuntos:', error)
    );
  }

  loadHistorial(page: number = 1, pageSize: number = 10): void {
    const filterParams = this.filterForm.value;

    this.difuntoHistoryService.getDifuntoHistorials(page, pageSize, filterParams).subscribe(response => {
      this.historialItems = response.results;
      this.totalItems = response.count;

      this.historialItems.forEach((item) => {
        if (item.deudo && typeof item.deudo === 'number') {
          this.difuntoService.getDeudoId(item.deudo).subscribe(
            (deudo: Deudo) => {
              item.deudoDetails = `${deudo.names}${deudo.last_names}`;
            },
            (error) => {
              console.error(`Error al cargar el deudo para la difunto con ID ${item.id}:`, error);
              item.deudoDetails = 'Información no disponible';
            }
          );
        }
      });

      this.compararVersiones(this.defaultObjectId);
    }, error => {
      console.error('Error al cargar el historial:', error);
    });
  }
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  campoLabels: { [key: string]: string } = {
    history_id: 'ID de Historial',
    history_user: 'Usuario',
    id: 'ID de Difunto',
    names: 'Nombres',
    last_names: 'Apellidos',
    idNumber: 'Cédula',
    loadDate: 'Fecha de Creación',
    updateDate: 'Fecha de Actualización',
    description: 'Descripción',
    requestNumber: 'Número de Solicitud',
    history_date: 'Fecha de Modificación',
    history_type: 'Acción',
    deudo: 'Deudo'
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
  formatRequestNumber(requestNumber: number): string {
    const formattedNumber = requestNumber.toString().padStart(8, '0');
    return `S${formattedNumber}`;
  }
  // Comparar versiones
  formatIdNumber(requestNumber: number): string {
    const formattedNumber = requestNumber.toString().padStart(10, '0');
    return `${formattedNumber}`;
  }
  // Comparar versiones


  // Comparar versiones para un objeto específico desde la acción en la tabla
  compararVersiones(objectId: number): void {
    this.difuntoHistoryService.compareDifuntoVersions(objectId).subscribe(
      (data) => {
        this.comparacion = data.cambios; // Actualiza la lista de comparaciones
        this.cdRef.detectChanges();
      },
      (error) => console.error('Error al comparar versiones:', error)
    );
  }



  // Restaurar una versión específica
  restaurarVersion(versionId: number): void {
    this.difuntoHistoryService.restoreDifuntoVersion(versionId).subscribe(
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

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DifuntoHistoryService } from '@admin/service/difunto-history/difunto-history.service';
import { DeudoHistory } from '@admin/models/difunto/deudoh.model';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { DifuntoService } from '@externo/services/difunto.service';


@Component({
  selector: 'app-deudo-historial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './deudo-historial.component.html',
  styleUrl: './deudo-historial.component.css'
})
export class DeudoHistorialComponent implements OnInit {
  deudos: Deudo[] = [];
  historialItems: DeudoHistory[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 17;
  comparacion: VersionCambio[] = [];
  filterForm: FormGroup;
  defaultObjectId: number = 1;
  showFilters:boolean=false;
  // Campos de filtros y encabezados
  filterFields = [
    { name: 'start_date', label: 'Fecha de Inicio' },
    { name: 'end_date', label: 'Fecha de Fin' },
    { name: 'entity_id', label: 'ID del Deudo' },
    { name: 'names', label: 'Nombres' },
    { name: 'last_names', label: 'Apellidos' },
    { name: 'idNumber', label: 'Cédula' },
    { name: 'phoneNumber', label: 'Teléfono' },
    { name: 'address', label: 'Dirección' },
    { name: 'tipo', label: 'Relación' },
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
    tipo: [
      { value: '', label: 'Todos' },
      { value: 'Allegado', label: 'Allegado' },
      { value: 'Familiar', label: 'Familiar' },
      { value: 'Conocido', label: 'Conocido' }
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
    'ID Deudo',
    'Nombres',
    'Apellidos',
    'Cédula',
    'Teléfono',
    'Dirección',
    'Relación',
    'Fecha de Creación',
    'Fecha de Modificación',
    'Acción',
    'Fecha del Cambio'
  ];
  constructor(
    private fb: FormBuilder,
    private deudoHistoryService: DifuntoHistoryService,
    private difuntoService:DifuntoService,
    private cdRef: ChangeDetectorRef
  ) {
    this.filterForm = this.fb.group({
      start_date: [''],
      end_date: [''],
      entity_id: [''],
      names: [''],
      last_names: [''],
      idNumber: [''],
      phoneNumber: [''],
      address: [''],
      tipo: [''],
      history_type: [''],
      user: ['']
    });
  }

  ngOnInit(): void {
    this.loadHistorial(this.currentPage, this.pageSize); // Cargar todo el historial al inicio  
    this.loadDeudos();
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
  loadHistorial(page: number = 1, pageSize: number = 10): void {
    const filterParams = this.filterForm.value;

    this.deudoHistoryService.getDeudoHistorials(page, pageSize, filterParams).subscribe(response => {
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
    id: 'ID de Deudo',
    loadDate: 'Fecha de Creación',
    updateDate: 'Fecha de Actualización',
    names: 'Nombres',
    last_names: 'Apellidos',
    idNumber: 'Cédula',
    phoneNumber: 'Teléfono',
    address: 'Dirección',
    tipo: 'Relación',
    description: 'Descripción',
    history_date: 'Fecha de Modificación',
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
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  // Comparar versiones


  // Comparar versiones para un objeto específico desde la acción en la tabla
  compararVersiones(objectId: number): void {
    this.deudoHistoryService.compareDeudoVersions(objectId).subscribe(
      (data) => {
        this.comparacion = data.cambios; // Actualiza la lista de comparaciones
        this.cdRef.detectChanges();
      },
      (error) => console.error('Error al comparar versiones:', error)
    );
  }



  // Restaurar una versión específica
  restaurarVersion(versionId: number): void {
    this.deudoHistoryService.restoreDeudoVersion(versionId).subscribe(
      (response) => {
        console.log('Restauración exitosa:', response);
        this.loadHistorial(this.currentPage, this.pageSize); // Recargar el historial después de restaurar
      },
      (error) => console.error('Error al restaurar la versión:', error)
    );
  }
  formatIdNumber(requestNumber: number): string {
    const formattedNumber = requestNumber.toString().padStart(10, '0');
    return `${formattedNumber}`;
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
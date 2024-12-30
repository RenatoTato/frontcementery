import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DifuntoHistory } from '@admin/models/difunto/difuntoh.model';
import { PaginationService } from '@admin/service/pagination-service/pagination.service';
import { MapService } from '@admin/service/map-service/map.service';
import { HistorialConfigService } from '@admin/service/historial-config/historial-config.service';
import { DifuntoService } from '@externo/services/difunto.service';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { ServicioHistoryService } from '@admin/service/servicio-history/servicio-history.service';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { TablaGenericaComponent } from '@admin/components/tabla-generica/tabla-generica.component';
import { Field } from '@admin/models/cambios/field.model';

@Component({
  selector: 'app-difunto-historial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaGenericaComponent],
  templateUrl: './difunto-historial.component.html',
  styleUrl: './difunto-historial.component.css'
})
export class DifuntoHistorialComponent implements OnInit {
  

  filterFields: any[] = []; // Declarar la propiedad como un array vacío
  filterForm: FormGroup; // Declarar filterForm si aún no está
  filterOptions: any = {}; // Declaración de filterOptions
  historialItems: DifuntoHistory[] = [];
  difuntos: Difunto[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 17;
  deudos: Deudo[] = [];
  comparacion: VersionCambio[] = [];
  defaultObjectId: number = 1;
  deudoNamesCache: { [key: number]: string } = {}; // Mapa de caché para nombres de deudos
  showFilters: boolean = false;
  mapMethods: { [key: string]: (value: any) => string } = {}; // Inicializar mapMethods
  tableKeys: string[] = [
    'history_user',
    'id',
    'names',
    'last_names',
    'idNumber',
    'requestNumber',
    'deudoDetails', // Utiliza el nombre mapeado para mostrar el texto legible
    'loadDate',
    'updateDate',
    'historyTypeText', // Muestra el texto legible para el tipo
    'history_date',
  ];
  tableHeaders: string[] = [
    'Creación',
    'Modificación',
    'Usuario',
    'Difunto',
    'Nombres',
    'Apellidos',
    'Cédula',
    'Solicitud',
    'Deudo',
    'Tipo de Cambio',
    'Fecha Acción',
  ]; // Declarar tableHeaders si también falta


  constructor(
    private fb: FormBuilder,
    private difuntoHistoryService: ServicioHistoryService,
    private difuntoService: DifuntoService,
    private paginationService: PaginationService,
    private mapService: MapService,
    private configService: HistorialConfigService,
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

  private buildDynamicFilterForm(): void {
    const formGroup: { [key: string]: any } = {};
  
    this.filterFields.forEach(field => {
      formGroup[field.name] = ['']; // Inicializa cada campo como vacío
    });
  
    this.filterForm = this.fb.group(formGroup);
    console.log('Formulario dinámico:', this.filterForm.value); // Verifica que contenga `history_type` y `user`
  }
  private loadDynamicOptions(): void {
    const fields: Field[] = this.configService.getConfig('difunto').fields;
  
    // Simula carga dinámica para `history_type`
    this.filterOptions.history_type = fields
      .find((field: Field) => field.name === 'history_type')?.options || [];
  
    // Simula carga dinámica para `user`
    this.filterOptions.user = fields
      .find((field: Field) => field.name === 'user')?.options || [];
  }

  ngOnInit(): void {
    const config = this.configService.getConfig('difunto');
  this.filterFields = config.fields;

  // Construcción del formulario dinámico
  this.buildDynamicFilterForm();

  // Carga las opciones desde el servicio
  this.filterOptions = this.getFilterOptions(this.filterFields);

  // Si las opciones vienen del servicio
  this.loadDynamicOptions();

    this.tableHeaders = [
      'Usuario',
      'Difunto',
      'Nombres',
      'Apellidos',
      'Cédula',
      'Solicitud',
      'Deudo',
      'Creación',
      'Modificación',
      'Tipo de Cambio',
      'Fecha Acción',
    ];
    this.tableKeys = [
      'history_user',
      'id',
      'names',
      'last_names',
      'idNumber',
      'requestNumber',
      'deudoDetails',
      'loadDate',
      'updateDate',
      'historyTypeText',
      'history_date',
    ];

    // Métodos de mapeo dinámico
    this.mapMethods = {
      history_user: (value: string) => this.mapService.mapUser(value),
      idNumber: (value: string) => this.mapService.formatIdNumber(Number(value)),
      requestNumber: (value: string) => this.mapService.formatRequestNumber(Number(value)),
      deudo: (value: number) => this.obtenerNombreDeudo(value),
      loadDate: (value: string) => this.mapService.formatDate(value),
      updateDate: (value: string) => this.mapService.formatDate(value),
      history_type: (value: string) => this.mapService.mapHistoryType(value),
      history_date: (value: string) => this.mapService.formatDate(value),
    };

    this.loadHistorial(this.currentPage, this.pageSize);
    this.loadDeudos();
    this.loadDifuntos();

  }


  loadDeudos(): void {
    this.difuntoService.getReadDeudos().subscribe(
      (deudos: Deudo[]) => {
        this.deudos = deudos;
        console.log('difunto:', this.difuntos);
      },
      (error) => console.error('Error al obtener las deudos:', error)
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

    this.difuntoHistoryService.getHistorials<DifuntoHistory>(
      'difunto',
      page,
      pageSize,
      filterParams
    ).subscribe(
      (response: { results: DifuntoHistory[]; count: number }) => {
        console.log('Datos originales antes de los mapeos:', response.results); // Verifica los datos originales

        // Ajusta los datos al orden especificado en tableKeys
        this.historialItems = response.results.map(item => {
          console.log('Item original:', item); // Verifica cada elemento antes del mapeo

          // Generar el item mapeado
          const mappedItem: Partial<DifuntoHistory> = {
            ...item, // Mantiene los campos originales
            history_user: this.mapService.mapUser(item.history_user), // Usuario (mapeado)
            idNumber: item.idNumber ? this.mapService.formatIdNumber(Number(item.idNumber)) : 'N/A',
            requestNumber: item.requestNumber ? this.mapService.formatRequestNumber(Number(item.requestNumber)) : 'N/A',
            loadDate: this.mapService.formatDate(item.loadDate), // Fecha de creación formateada
            updateDate: this.mapService.formatDate(item.updateDate), // Fecha de actualización formateada
            historyTypeText: this.mapService.mapHistoryType(item.history_type), // Texto legible para la tabla
            history_date: this.mapService.formatDate(item.history_date), // Fecha de modificación formateada
            deudoDetails: 'Cargando...' // Inicialmente asignar "Cargando..."
          };

          // Obtener detalles del deudo si existe
          if (item.deudo && typeof item.deudo === 'number') {
            this.mapService.getDeudoDetails(item.deudo).subscribe(
              deudoDetails => {
                mappedItem.deudoDetails = deudoDetails; // Actualizar detalles del deudo
                this.cdRef.detectChanges(); // Asegurar que la vista se actualice
              },
              error => {
                console.error(`Error al obtener detalles del deudo con ID ${item.deudo}:`, error);
                mappedItem.deudoDetails = 'Información no disponible'; // Manejar error
              }
            );
          } else {
            mappedItem.deudoDetails = 'Sin asignar'; // Si no hay deudo
          }

          return mappedItem as DifuntoHistory; // Cast explícito para cumplir con el tipo
        });

        console.log('Datos transformados:', this.historialItems); // Verifica los datos transformados
        this.totalItems = response.count;
        this.compararVersiones(this.defaultObjectId);
      },
      error => {
        console.error('Error al cargar el historial:', error);
      }
    );
  }





  // Mapear valores para history_type
  mapUser(userId: string | undefined): string {
    return this.mapService.mapUser(userId as string); // Forzar el tipo a string si es necesario
  }

  mapHistoryType(type: string): string {
    return this.mapService.mapHistoryType(type as string); // Forzar el tipo a string
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
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  private getFilterOptions(fields: any[]): any {
    const options: any = {};
    fields.forEach((field) => {
      if (field.type === 'select' && field.options) {
        options[field.name] = field.options;
      }
    });
    return options;
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


  // Comparar versiones para un objeto específico desde la acción en la tabla
  compararVersiones(objectId: number): void {
    this.difuntoHistoryService.compareVersions<VersionCambio>('difunto', objectId).subscribe(
      (data) => {
        this.comparacion = data.cambios;
        this.cdRef.detectChanges();
      },
      (error) => console.error('Error al comparar versiones:', error)
    );
  }

  restaurarVersion(versionId: number): void {
    this.difuntoHistoryService.restoreVersion('difunto', versionId).subscribe(
      () => {
        this.loadHistorial(this.currentPage, this.pageSize);
      },
      (error) => console.error('Error al restaurar la versión:', error)
    );
  }


  // Paginación
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  changePage(step: number): void {
    this.currentPage = this.paginationService.validatePageChange(this.currentPage, step, this.totalPages);
    this.loadHistorial(this.currentPage, this.pageSize);
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

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioHistoryService } from '@admin/service/servicio-history/servicio-history.service';
import { ServicioHistory } from '@admin/models/servicio/servicioh.model';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DifuntoService } from '@externo/services/difunto.service';

@Component({
  selector: 'app-servicio-historial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './servicio-historial.component.html',
  styleUrl: './servicio-historial.component.css'
})
export class ServicioHistorialComponent implements OnInit {
  historialItems: ServicioHistory[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 17;
  comparacion: VersionCambio[] = [];
  selectedObjectId: number | null = null;
  filterForm: FormGroup;
  limite: number = 5; // Declaramos `limite` aquí
  defaultObjectId: number = 1;
  difuntoNamesCache: { [key: number]: string } = {}; // Mapa de caché para nombres de difuntos
  // Campos de filtros y encabezados
  filterFields = [
    { name: 'startDate', label: 'Fecha del contrato' },
    { name: 'endDate', label: 'Fecha de vencimiento' },
    { name: 'entity_id', label: 'ID de Servicio' },
    { name: 'numberTomb', label: 'Numero de tumba' },
    { name: 'deceased', label: 'Difunto' },
    { name: 'ceremony', label: 'Ceremonia' },
    { name: 'history_type', label: 'Acciones' },
    { name: 'user', label: 'Usuario' },
  ];
  filterOptions = {
    ceremony: [
      { value: '', label: 'Todas las Ceremonias' }, // Opción inicial vacía
      { value: 'Cremacion', label: 'Cremación' },
      { value: 'Inhumacion', label: 'Inhumación' },
      { value: 'Exhumacion', label: 'Exhumación' },
      { value: 'Conmemoracion', label: 'Conmemoración' },
      { value: 'Mantenimiento', label: 'Mantenimiento' }
    ],
    history_type: [
      { value: '', label: 'Todas las Acciones' }, // Opción inicial vacía
      { value: '+', label: 'Creación' },
      { value: '~', label: 'Actualización' },
      { value: '-', label: 'Eliminación' }
    ],
    user: [
      { value: '', label: 'Todos los Usuarios' }, // Opción inicial vacía
      { value: 1, label: 'Renato Carvajal' },
      { value: 2, label: 'Priscila Rodríguez' },
      { value: 3, label: 'Fernando Abdón' },
      { value: 4, label: 'Livingston Olivares' },
      { value: 5, label: 'Tato Admin' }
    ]
  };


  tableHeaders = [
    'Usuario',
    'ID Servicio',
    'Fecha Inicio',
    'Fecha Fin',
    'Ceremonia',
    'Estado de Pago',
    'Monto Pagado',
    'Fecha Creación',
    'Fecha Modificación',
    'Tipo de Cambio',
    'Número de Tumba',
    'Difunto',
  ];
  constructor(
    private fb: FormBuilder,
    private servicioHistoryService: ServicioHistoryService,
    private difuntoService: DifuntoService,
    private cdRef: ChangeDetectorRef // Inyectamos ChangeDetectorRef
  ) {
    // Filtros
    this.filterForm = this.fb.group({
      start_date: [''],
      end_date: [''],
      entity_id: [''],
      history_type: [''],
      user: [''],
      startDate: [''],
      endDate: [''],
      ceremony: [''],
      numberTomb: [''],
      deceased: [''],
      id: ['']
    });
  }
  obtenerNombreDifunto(id: number | string | true): string {
    // Asegúrate de que id es un número antes de continuar
    if (typeof id !== 'number') {
      return 'N/A'; // O el valor predeterminado en caso de un tipo no válido
    }

    // Si ya tenemos el nombre en la caché, lo retornamos directamente
    if (this.difuntoNamesCache[id]) {
      return this.difuntoNamesCache[id];
    }

    // De lo contrario, llamamos al servicio para obtener el nombre del difunto
    this.difuntoService.getDifuntoId(id).subscribe(
      difunto => {
        this.difuntoNamesCache[id] = `${difunto.names} ${difunto.last_names}`;
      },
      error => {
        console.error(`Error al cargar el nombre del difunto con ID ${id}:`, error);
        this.difuntoNamesCache[id] = 'N/A'; // Valor predeterminado si falla la carga
      }
    );

    // Retorna un valor temporal mientras se carga el nombre del difunto
    return this.difuntoNamesCache[id] || 'Cargando...';
  }

  ngOnInit(): void {
    this.loadHistorial(this.currentPage, this.pageSize); // Cargar todo el historial al inicio  
  }

  // Método para cargar historial con los filtros aplicados
  loadHistorial(page: number = 1, pageSize: number = 10): void {
    const filterParams = this.filterForm.value;

    this.servicioHistoryService.getServicioHistorials(page, pageSize, filterParams).subscribe(response => {
      this.historialItems = response.results;
      this.totalItems = response.count;

      this.historialItems.forEach(item => {
        if (item.deceased && typeof item.deceased === 'number') {
          this.difuntoService.getDifuntoId(item.deceased).subscribe(
            difunto => {
              item.deceasedName = `${difunto.names} ${difunto.last_names}`;
            },
            error => {
              console.error(`Error al cargar el difunto para el historial con ID ${item.id}:`, error);
            }
          );
        }
      });

      this.compararVersiones(this.defaultObjectId);
    }, error => {
      console.error('Error al cargar el historial:', error);
    });
  }


  // Mapear valores para history_type
  mapHistoryType(type: string): string {
    const typeMap: { [key: string]: string } = {
      '+': 'Creación',
      '~': 'Actualización',
      '-': 'Eliminación'
    };
    return typeMap[type] || type;
  }
  campoLabels: { [key: string]: string } = {
    startDate: 'Fecha del contrato',
    endDate: 'Fecha de vencimiento',
    entity_id: 'ID Servicio',
    numberTomb: 'Número de tumba',
    deceased: 'Difunto',
    ceremony: 'Ceremonia',
    history_type: 'Acciones',
    user: 'Usuario',
    payment_date: 'Fecha de pago',
    is_paid: 'Cancelado',
    amount_paid: 'Moto a pagar',
    description: 'Descripción'
    // Añade otros campos necesarios aquí
  };

  mapCeremony(ceremony: string): string {
    const ceremonyMap: { [key: string]: string } = {
      'Cremacion': 'Cremación',
      'Inhumacion': 'Inhumación',
      'Exhumacion': 'Exhumación',
      'Conmemoracion': 'Conmemoración',
      'Mantenimiento': 'Mantenimiento'
    };
    return ceremonyMap[ceremony] || ceremony;
  }

  // Mapear valores para user
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
    this.servicioHistoryService.compareServicioVersions(objectId).subscribe(
      (data) => {
        this.comparacion = data.cambios; // Actualiza la lista de comparaciones
        this.cdRef.detectChanges();
      },
      (error) => console.error('Error al comparar versiones:', error)
    );
  }



  // Restaurar una versión específica
  restaurarVersion(versionId: number): void {
    this.servicioHistoryService.restoreServicioVersion(versionId).subscribe(
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
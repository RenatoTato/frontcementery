import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationService } from '@admin/service/pagination-service/pagination.service';
import { MapService } from '@admin/service/map-service/map.service';
import { HistorialConfigService } from '@admin/service/historial-config/historial-config.service';
import { DeudoHistory } from '@admin/models/difunto/deudoh.model';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { DifuntoService } from '@externo/services/difunto.service';
import { ServicioHistoryService } from '@admin/service/servicio-history/servicio-history.service';
import { TablaGenericaComponent } from '@admin/components/tabla-generica/tabla-generica.component';
import { Field } from '@admin/models/cambios/field.model';


@Component({
    selector: 'app-deudo-historial',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TablaGenericaComponent],
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
    showFilters: boolean = false;
    // Campos de filtros y encabezados

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
        private deudoHistoryService: ServicioHistoryService,
        private deudoService: DifuntoService,
        private paginationService: PaginationService,
        private mapService: MapService,
        private configService: HistorialConfigService,
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
        this.deudoService.getReadDeudos().subscribe(
            (deudos: Deudo[]) => {
                this.deudos = deudos;
                console.log('deudo:', this.deudos);
            },
            (error) => console.error('Error al obtener las difuntos:', error)
        );
    }
    loadHistorial(page: number = 1, pageSize: number = 10): void {
        const filterParams = this.filterForm.value;
    
        this.deudoHistoryService.getHistorials<DeudoHistory>(
          'deudo',
          page,
          pageSize,
          filterParams
        ).subscribe(
          (response: { results: DeudoHistory[]; count: number }) => {
            console.log('Datos originales antes de los mapeos:', response.results); // Verifica los datos originales
    
            // Ajusta los datos al orden especificado en tableKeys
            this.historialItems = response.results.map(item => {
              console.log('Item original:', item); // Verifica cada elemento antes del mapeo
    
              // Generar el item mapeado
              const mappedItem: Partial<DeudoHistory> = {
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
      formatIdNumber(requestNumber: number): string {
        const formattedNumber = requestNumber.toString().padStart(10, '0');
        return `${formattedNumber}`;
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

    toggleFilters(): void {
        this.showFilters = !this.showFilters;
    }


    // Paginación

    changePage(step: number): void {
        this.currentPage = this.paginationService.validatePageChange(this.currentPage, step, this.totalPages);
        this.loadHistorial(); // Llamar a la carga de datos para la nueva página
    }

    goToFirstPage(): void {
        this.currentPage = this.paginationService.goToFirstPage();
        this.loadHistorial(); // Llamar a la carga de datos para la primera página
    }

    goToLastPage(): void {
        this.currentPage = this.paginationService.goToLastPage(this.totalPages);
        this.loadHistorial(); // Llamar a la carga de datos para la última página
    }
    resetFilters(): void {
        this.filterForm.reset();
        this.loadHistorial(1, this.pageSize);
    }
    get totalPages(): number {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    compararVersiones(objectId: number): void {
        this.deudoHistoryService.compareVersions<VersionCambio>('difunto', objectId).subscribe(
            (data) => {
                this.comparacion = data.cambios;
                this.cdRef.detectChanges();
            },
            (error) => console.error('Error al comparar versiones:', error)
        );
    }

    restaurarVersion(versionId: number): void {
        this.deudoHistoryService.restoreVersion('difunto', versionId).subscribe(
            () => {
                this.loadHistorial(this.currentPage, this.pageSize);
            },
            (error) => console.error('Error al restaurar la versión:', error)
        );
    }

    
}
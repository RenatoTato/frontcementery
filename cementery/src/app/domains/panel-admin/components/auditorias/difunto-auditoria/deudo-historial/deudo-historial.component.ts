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
    filtersInitialized = false;
    historialItems: DeudoHistory[] = [];
    mapMethods: { [key: string]: (value: any) => string } = {}; // Inicializar mapMethods
    totalItems: number = 0;
    currentPage: number = 1;
    pageSize: number = 17;
    comparacion: VersionCambio[] = [];
    filterFields: any[] = []; // Declarar la propiedad como un array vacío
    filterForm: FormGroup; // Declarar filterForm si aún no está
    filterOptions: any = {}; // Declaración de filterOptions
    defaultObjectId: number = 1;
    showFilters: boolean = false;
    tableHeaders: string[] = [
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
    ];    // Campos de filtros y encabezados
    tableKeys: string[] = [
        'history_user',
        'id',
        'names',
        'last_names',
        'idNumber',
        'phoneNumber',
        'address',
        'tipo',
        'loadDate',
        'updateDate',
        'historyTypeText',
        'history_date',
    ]; // Declarar tableHeaders si también falta

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
            start_date: [null], // O algún rango por defecto si es necesario
            end_date: [null],
            entity_id: [null],
            names: [null],
            last_names: [null],
            idNumber: [null],
            phoneNumber: [null],
            address: [null],
            tipo: [null],
            history_type: [null],
            user: [null],
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
    private getFilterOptions(fields: any[]): any {
        const options: any = {};
        fields.forEach((field) => {
            if (field.type === 'select' && field.options) {
                options[field.name] = field.options;
            }
        });
        return options;
    }
    private async initializeFilters(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const config = this.configService.getConfig('deudo');
                if (config) {
                    this.filterFields = config.fields || [];
                    this.buildDynamicFilterForm();
                    this.filterOptions = this.getFilterOptions(this.filterFields); // Usar el método aquí
                    resolve(); // Filtros inicializados correctamente
                } else {
                    throw new Error('No se encontró configuración para "deudo"');
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    

    ngOnInit(): void {
        this.initializeFilters().then(() => {
            this.filtersInitialized = true;
            this.loadHistorial(this.currentPage, this.pageSize);
        });
    
        this.tableHeaders = [
            'Usuario', 'ID Deudo', 'Nombres', 'Apellidos', 'Cédula',
            'Teléfono', 'Dirección', 'Relación', 'Fecha de Creación',
            'Fecha de Modificación', 'Acción', 'Fecha del Cambio'
        ];
    
        this.tableKeys = [
            'history_user', 'id', 'names', 'last_names', 'idNumber',
            'phoneNumber', 'address', 'tipo', 'loadDate', 'updateDate',
            'historyTypeText', 'history_date'
        ];
    
        this.mapMethods = {
            history_user: (value: string) => this.mapService.mapUser(value),
            idNumber: (value: string) => this.mapService.formatIdNumber(Number(value)),
            loadDate: (value: string) => this.mapService.formatDate(value),
            updateDate: (value: string) => this.mapService.formatDate(value),
            history_type: (value: string) => this.mapService.mapHistoryType(value),
            history_date: (value: string) => this.mapService.formatDate(value),
        };
        this.deudos = this.deudos.map(deudo => ({
            ...deudo,
            formattedId: this.mapService.formatIdNumber(Number(deudo.idNumber))
          }));
    
        // Cargar datos iniciales
        this.loadDeudos();
        this.loadHistorial(this.currentPage, this.pageSize);
    }
    
    loadDeudos(): void {
        this.deudoService.getReadDeudos().subscribe(
          (deudos) => {
            this.deudos = deudos.map(deudo => ({
              ...deudo,
              formattedId: this.mapService.formatIdNumber(Number(deudo.idNumber))
            }));
          },
          (error) => console.error('Error al obtener los difuntos:', error)
        );
      }

    loadHistorial(page: number = 1, pageSize: number = 10): void {
        console.log('Cargando historial con filtros:', this.filterForm.value);
        this.deudoHistoryService.getHistorials<DeudoHistory>(
            'deudo', page, pageSize, { ...this.filterForm.value }
        ).subscribe(
            (response) => {
                console.log('Datos de historial:', response.results);
                this.historialItems = response.results.map(item => ({
                    ...item,
                    history_user: this.mapService.mapUser(item.history_user),
                    idNumber: this.mapService.formatIdNumber(Number(item.idNumber)),
                    loadDate: this.mapService.formatDate(item.loadDate),
                    updateDate: this.mapService.formatDate(item.updateDate),
                    historyTypeText: this.mapService.mapHistoryType(item.history_type),
                    history_date: this.mapService.formatDate(item.history_date),
                }));
                this.totalItems = response.count;
                this.compararVersiones(this.defaultObjectId);
            },
            (error) => console.error('Error al cargar el historial:', error)
        );
    }
    
    
    // Mapear valores para history_type
    mapUser(userId: string | undefined): string {
        return this.mapService.mapUser(userId as string); // Forzar el tipo a string si es necesario
    }

    mapHistoryType(type: string): string {
        return this.mapService.mapHistoryType(type as string); // Forzar el tipo a string
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
        this.deudoHistoryService.compareVersions<VersionCambio>('deudo', objectId).subscribe(
            (data) => {
                this.comparacion = data.cambios;
                this.cdRef.detectChanges();
            },
            (error) => console.error('Error al comparar versiones:', error)
        );
    }

    restaurarVersion(versionId: number): void {
        this.deudoHistoryService.restoreVersion('deudo', versionId).subscribe(
            () => {
                this.loadHistorial(this.currentPage, this.pageSize);
            },
            (error) => console.error('Error al restaurar la versión:', error)
        );
    }
}
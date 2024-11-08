import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioHistoryService } from '@admin/service/servicio-history/servicio-history.service';
import { ServicioHistory } from '@admin/models/servicio/servicioh.model';
import { ServicioHistoryFilter } from '@admin/models/servicio/serviciof.model';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { ResponseRestaurar } from '@admin/models/cambios/restaurar.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
    private servicioHistoryService: ServicioHistoryService,
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

  ngOnInit(): void {
    this.loadHistorial(this.currentPage, this.pageSize); // Cargar todo el historial al inicio  
  }

  // Método para cargar historial con los filtros aplicados
  loadHistorial(page: number = 1, pageSize: number = 10): void {
    const filterParams = this.filterForm.value; // Utiliza los valores de filtro del formulario
    this.servicioHistoryService.getServicioHistorials(page, pageSize, filterParams).subscribe(response => {
      this.historialItems = response.results;
      this.totalItems = response.count;
      // Cargar comparación cada vez que se recargue el historial
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

  // Mapear valores para ceremony
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
  mapUser(userId: number | undefined): string {
    const userMap: { [key: number]: string } = {
      1: 'Renato Carvajal',
      2: 'Priscila Rodríguez',
      3: 'Fernando Abdón',
      4: 'Livingston Olivares',
      5: 'Tato Admin'
    };
    return userId !== undefined ? userMap[userId] || 'Desconocido' : 'Desconocido';
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
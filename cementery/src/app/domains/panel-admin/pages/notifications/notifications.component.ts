import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '@externo/services/notification.service';
import { Notificacion } from '@externo/models/notifications/notificacion.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: Notificacion[] = [];
  paginatedNotifications: Notificacion[] = [];
  notificationFilterForm!: FormGroup;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  showFilters = false;

  filterFields = [
    { name: 'name', label: 'Nombre' },
    { name: 'area', label: 'areaOptions' },
    { name: 'created_at', label: 'Fecha de Creación' },
    { name: 'is_attended', label: 'Atendido (true/false)' },
  ];
  areaOptions = [
    { value: 'correccion_datos', label: 'Datos' },
    { value: 'soporte', label: 'Soporte' },
    { value: 'paquetes', label: 'Paquetes' },
  ];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadNotifications(this.currentPage, this.pageSize, this.notificationFilterForm.value);
    this.setupFilterListener();
  }

  initForm(): void {
    this.notificationFilterForm = this.fb.group({
      name: [''],
      area: [''],
      created_at: [''],
      is_attended: [false],
    });
    this.setupFilterListener();
  }

  setupFilterListener(): void {
    this.notificationFilterForm.valueChanges.subscribe((filters) => {
      this.loadNotifications(1, this.pageSize, filters);
    });
  }

  loadNotifications(page: number, pageSize: number, filters?: any): void {
    this.notificationService.getNotifications(page, pageSize, filters).subscribe(
      (response) => {
        // Asignar directamente los valores esperados
        this.notifications = response.results;
        this.totalItems = response.count;
        this.paginatedNotifications = [...this.notifications];
      },
      (error) => console.error('Error al cargar notificaciones:', error)
    );
  }


  nextPage(step: number): void {
    if (this.currentPage + step <= this.totalPages) {
      this.currentPage += step;
      this.loadNotifications(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    if (this.currentPage - step >= 1) {
      this.currentPage -= step;
      this.loadNotifications(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadNotifications(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadNotifications(this.currentPage, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onSubmit(): void {
    const filters = this.notificationFilterForm.value;
    this.loadNotifications(1, this.pageSize, filters);
  }

  resetFilters(): void {
    this.notificationFilterForm.reset();
    this.loadNotifications(1, this.pageSize);
  }

  markAsAttended(notification: any): void {
    if (confirm('¿Estás seguro de que quiere marcar como atendido?')) {
      if (notification.is_attended) {
        return;
      }

      this.notificationService.markAsAttended(notification.id).subscribe(
        () => {
          notification.is_attended = true;
          console.log(`Notificación ${notification.id} marcada como atendida.`);
        },
        (error) => console.error('Error al marcar como atendida:', error)
      );
    }

  }
  transformArea(area: string): string {
    switch (area) {
      case 'correccion_datos':
        return 'Datos';
      case 'soporte':
        return 'Soporte';
      case 'paquetes':
        return 'Paquetes';
      default:
        return area; // Devuelve el valor original si no coincide
    }
  }
}



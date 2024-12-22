import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@externo/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  showList = true; // Controla si se muestra la lista o el detalle
  notifications: any[] = []; // Lista de notificaciones
  notification: any | null = null; // Notificación seleccionada
  filters: any = {}; // Filtros aplicados

  constructor(
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de parámetros en la ruta
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadNotificationById(id);
        this.showList = false;
      } else {
        this.loadNotifications();
        this.showList = true;
      }
    });
  }

  // Cargar todas las notificaciones
  loadNotifications(): void {
    this.notificationService.getNotifications(this.filters).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error al cargar notificaciones:', error);
      }
    );
  }

  // Cargar una notificación específica por ID
  loadNotificationById(id: string): void {
    this.notificationService.getNotificationById(id).subscribe(
      (data) => {
        this.notification = data;
      },
      (error) => {
        console.error('Error al cargar el detalle de la notificación:', error);
      }
    );
  }

  // Seleccionar una notificación
  onSelectNotification(id: string): void {
    this.router.navigate([`/admin/notificaciones/${id}`]); // Navega al detalle
  }

  // Marcar como atendida
  markAsAttended(): void {
    if (this.notification) {
      this.notificationService.markAsAttended(this.notification.id).subscribe(
        () => {
          alert('Notificación marcada como atendida.');
          this.goBack();
        },
        (error) => {
          console.error('Error al marcar como atendida:', error);
        }
      );
    }
  }
  handleKeyPress(event: KeyboardEvent, id: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onSelectNotification(id.toString()); // Convertir número a cadena
      event.preventDefault();
    }
  }

  // Volver a la lista
  goBack(): void {
    this.notification = null;
    this.showList = true;
    this.router.navigate(['/admin/notificaciones']);
  }
}
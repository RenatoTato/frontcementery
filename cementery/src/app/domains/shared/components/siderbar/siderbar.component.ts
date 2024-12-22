import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@externo/services/auth.service';
import { NotificationService } from '@externo/services/notification.service';
@Component({
  selector: 'app-siderbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.css'
})
export class SiderbarComponent implements OnInit {
  isDarkMode = false;
  isCementerioOpen = false; // Controla la visibilidad de las subcategorías
  isInformativoOpen = false; // Controla la visibilidad de las subcategorías
  isSidebarCollapsed = false;
  isAdmin: boolean = false; // Inicializar la propiedad como falsa
  notifications: any[] = []; // Almacena las notificaciones obtenidas del backend
  pendingCount: number = 0; // Ahora es accesible desde la plantilla
  showNotificationsPopup: boolean = false;
  user: { first_name: string; last_name: string; email: string; roles: string[] } | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) { this.isDarkMode = document.body.classList.contains('dark'); }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found, redirecting to login');
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }

    // Obtener información del usuario desde el servicio
    this.user = this.authService.getUserInfo();
    console.log('Usuario cargado en sidebar:', this.user);

    // Verificar si el usuario es administrador
    this.isAdmin = this.user.roles.includes('Administrador');
    this.loadNotifications(); // Cargar notificaciones
    this.notificationService.getPendingCount().subscribe(count => {
      this.pendingCount = count;
    });
  }

  // Método para obtener los datos del usuario desde el backend

  loadNotifications(): void {
    this.notificationService.getNotifications({ is_attended: false }).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error al cargar notificaciones:', error);
      }
    );
  }

  goToNotificationDetail(id: number): void {
    this.router.navigate([`/admin/notificaciones/${id}`]); // Ajusta la ruta
  }
  toggleCementerio(): void {
    this.isCementerioOpen = !this.isCementerioOpen; // Alterna entre mostrar y ocultar
  }
  toggleNotificationsPopup(): void {
    this.showNotificationsPopup = !this.showNotificationsPopup;
  }

  toggleInformativo(): void {
    this.isInformativoOpen = !this.isInformativoOpen; // Alterna entre mostrar y ocultar
  }
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('darkMode');
    this.router.navigate(['/']);
  }
  handleKeyPress(event: KeyboardEvent, id: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.goToNotificationDetail(id); // Llama a la función del clic
      event.preventDefault(); // Previene desplazamientos no deseados con la barra espaciadora
    }
  }
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  loadDarkModePreference(): void {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
  getUserImage(): string {
    if (this.user) {
      // Compara el nombre del usuario
      if (this.user.first_name === 'Pricila' || this.user.roles.includes('Secretaria')) {
        return 'assets/fotos/pricila.jpeg';
      } else if (this.user.first_name === 'Livingston' || this.user.roles.includes('Administrador')) {
        return 'assets/fotos/olivares.jpeg';
      }
    }
    // Imagen predeterminada si no coincide
    return 'assets/fotos/default.jpeg';
  }
}

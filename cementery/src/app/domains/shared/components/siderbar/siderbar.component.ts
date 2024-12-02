import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, BasicUserInfo } from '@externo/models/auth/user.model';
import { AuthService } from '@externo/services/auth.service';
@Component({
  selector: 'app-siderbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.css'
})
export class SiderbarComponent {
  isDarkMode = false;
  isCementerioOpen = false; // Controla la visibilidad de las subcategorías
  isInformativoOpen = false; // Controla la visibilidad de las subcategorías
  isSidebarCollapsed = false;
  user: BasicUserInfo | null = null;

  constructor(private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) { this.isDarkMode = document.body.classList.contains('dark'); }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodifica el token
      const decodedToken = this.authService.decodeToken(token);

      if (decodedToken) {
        // Establece los datos básicos del usuario
        this.user = {
          first_name: decodedToken.first_name || '',
          last_name: decodedToken.last_name || '',
          email: decodedToken.email || '',
        };
      }

      // Intenta obtener el perfil completo si es necesario
      this.authService.getProfile().subscribe({
        next: (data) => {
          this.user = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
          };
        },
        error: (err) => {
          console.error('Error fetching user profile:', err);
        },
      });
    }
  }

  // Método para obtener los datos del usuario desde el backend
  getProfile(): Observable<User> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http.get<User>('http://127.0.0.1:8000/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    return new Observable(observer => {
      observer.error('No token available');
    });
  }
  toggleCementerio(): void {
    this.isCementerioOpen = !this.isCementerioOpen; // Alterna entre mostrar y ocultar
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
    this.router.navigate(['/']);
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
}

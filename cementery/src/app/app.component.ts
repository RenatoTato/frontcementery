import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';  // Ajusta la ruta si es necesario
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Verifica si el token está presente en localStorage
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        // Guardar los tokens en el localStorage
        localStorage.setItem('token', response.access);  // Token de acceso
        localStorage.setItem('refresh_token', response.refresh);  // Token de actualización
        this.router.navigate(['/admin']);  // Redirigir al PanelAdmin u otra página si es necesario
      },
      (error) => {
        console.error('Error de autenticación', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');  // Eliminar los tokens al cerrar sesión
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);  // Redirigir al PanelInfo
  }
}

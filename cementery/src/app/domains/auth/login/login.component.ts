import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        // Guardar los tokens en el localStorage
        localStorage.setItem('token', response.access); // Token de acceso
        localStorage.setItem('refresh_token', response.refresh); // Token de actualización
        this.router.navigate(['/admin']); // Redirigir al PanelAdmin
      },
      error => {
        console.error('Error de autenticación', error); // Manejar errores si el login falla
      }
    );
  }

  // Método para alternar el modo oscuro
  toggleDarkMode(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      document.documentElement.classList.add('dark'); // Activar el modo oscuro
    } else {
      document.documentElement.classList.remove('dark'); // Desactivar el modo oscuro
    }
  }
}

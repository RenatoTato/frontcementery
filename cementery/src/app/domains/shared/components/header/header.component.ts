import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDarkMode = false;
  sidebarVisible = false;
  @Output() toggleSidebar = new EventEmitter<void>(); // Define el Output

  constructor(private router: Router) { this.isDarkMode = document.body.classList.contains('dark'); }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }
  // Método para emitir el evento cuando se hace clic en el logo
  onLogoClick(): void {
    this.toggleSidebar.emit();
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

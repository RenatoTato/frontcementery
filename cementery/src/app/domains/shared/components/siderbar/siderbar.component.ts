import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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

  toggleCementerio(): void {
    this.isCementerioOpen = !this.isCementerioOpen; // Alterna entre mostrar y ocultar
  }
  
  toggleInformativo(): void {
    this.isInformativoOpen = !this.isInformativoOpen; // Alterna entre mostrar y ocultar
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

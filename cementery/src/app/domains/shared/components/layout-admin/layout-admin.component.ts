import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SiderbarComponent } from "../siderbar/siderbar.component";

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SiderbarComponent],
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.css']
})
export class LayoutAdminComponent {

  sidebarVisible = false; // Propiedad que controla la visibilidad del sidebar
  isSidebarCollapsed = true;

  // Método para alternar la visibilidad del sidebar

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
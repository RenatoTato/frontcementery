import { Component } from '@angular/core';
import { ServicioFormComponent } from "@admin/components/servicios/servicio/servicioForm.component";
import { ServicioReporteComponent } from "../../components/servicios/servicio-reporte/servicio-reporte.component";
import { CommonModule } from '@angular/common';
import { ServicioEditarComponent } from "../../components/servicios/servicio-editar/servicio-editar.component";

@Component({
  selector: 'app-servicio-dashboard',
  standalone: true,
  imports: [ServicioFormComponent,  CommonModule, ServicioEditarComponent],
  templateUrl: './servicio-dashboard.component.html',
  styleUrl: './servicio-dashboard.component.css'
})
export class ServicioDashboardComponent {

  // Estado actual del componente
  estadoActual:  'formulario' | 'edicion' = 'formulario';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado:  'formulario' | 'edicion'): void {
    this.estadoActual = nuevoEstado;
  }

  mostrarFormulario(): void {
    this.cambiarEstado('formulario');
  }

  mostrarEdicion(): void {
    this.cambiarEstado('edicion');
  }
}

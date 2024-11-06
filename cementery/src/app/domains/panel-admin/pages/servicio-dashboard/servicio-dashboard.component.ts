import { Component } from '@angular/core';
import { ServicioFormComponent } from "@admin/components/servicios/servicio/servicioForm.component";
import { ServicioReporteComponent } from "../../components/servicios/servicio-reporte/servicio-reporte.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicio-dashboard',
  standalone: true,
  imports: [ServicioFormComponent, ServicioReporteComponent, CommonModule],
  templateUrl: './servicio-dashboard.component.html',
  styleUrl: './servicio-dashboard.component.css'
})
export class ServicioDashboardComponent {

  mostrarFormularioDiv: boolean = true;
  mostrarEdicionDiv: boolean = false;
  mostrarReporteDiv: boolean = false;

  // Muestra el formulario y oculta la edición
  mostrarFormulario(): void {
    this.mostrarFormularioDiv = true;
    this.mostrarEdicionDiv = false;
    this.mostrarReporteDiv = false;
  }

  // Muestra la edición y oculta el formulario
  mostrarReporte(): void {
    this.mostrarFormularioDiv = false;
    this.mostrarEdicionDiv = false;
    this.mostrarReporteDiv = true;
  }

  // Muestra la edición y oculta el formulario
  mostrarEdicion(): void {
    this.mostrarFormularioDiv = false;
    this.mostrarEdicionDiv = true;
    this.mostrarReporteDiv = false;
  }

}

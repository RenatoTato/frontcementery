import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifuntoFormComponent } from "@admin/components/difuntos/difuntoForm/difuntoForm.component";
import { DeudoFormComponent } from "@admin/components/difuntos/deudoForm/deudoForm.component";
import { DifuntoEditarComponent } from "../../components/difuntos/difunto-editar/difunto-editar.component";
import { DifuntoReporteComponent } from "../../components/difuntos/difunto-reporte/difunto-reporte.component";
@Component({
  selector: 'app-difunto-dashboard',
  standalone: true,
  imports: [CommonModule, DifuntoFormComponent, DeudoFormComponent, DifuntoEditarComponent, DifuntoReporteComponent],
  templateUrl: './difunto-dashboard.component.html',
  styleUrl: './difunto-dashboard.component.css'
})
export class DifuntoDashboardComponent {
  mostrarFormularioDeudoDiv: boolean = true;
  mostrarFormularioDifuntoDiv: boolean = false;
  mostrarEdicionDiv: boolean = false;
  mostrarReporteDiv: boolean = false;

  // Muestra el formulario y oculta la edición
  mostrarFormularioDifunto(): void {
  this.mostrarFormularioDeudoDiv = false;
  this.mostrarFormularioDifuntoDiv = true;
  this.mostrarEdicionDiv = false;
  this.mostrarReporteDiv= false;
  }
  // Muestra el formulario y oculta la edición
  mostrarFormularioDeudo(): void {
  this.mostrarFormularioDeudoDiv = true;
  this.mostrarFormularioDifuntoDiv = false;
  this.mostrarEdicionDiv = false;
  this.mostrarReporteDiv= false;
  }

  // Muestra la edición y oculta el formulario
  mostrarReporte(): void {
    this.mostrarFormularioDeudoDiv = false;
    this.mostrarFormularioDifuntoDiv = false;
    this.mostrarEdicionDiv = false;
    this.mostrarReporteDiv= true;
  }

  // Muestra la edición y oculta el formulario
  mostrarEdicion(): void {
    this.mostrarFormularioDeudoDiv = false;
    this.mostrarFormularioDifuntoDiv = false;
    this.mostrarEdicionDiv = true;
    this.mostrarReporteDiv= false;
  }

}

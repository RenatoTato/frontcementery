import { Component } from '@angular/core';
import { TumbaFormComponent } from "../../components/tumbas/tumba/tumbaForm.component";
import { LoteReporteComponent } from "../../components/tumbas/lote-reporte/lote-reporte.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tumba-dashboard',
  standalone: true,
  imports: [TumbaFormComponent, LoteReporteComponent, CommonModule],
  templateUrl: './tumba-dashboard.component.html',
  styleUrl: './tumba-dashboard.component.css'
})
export class TumbaDashboardComponent {
  mostrarFormularioDiv: boolean = true;
  mostrarReporteDiv: boolean = false;

  // Muestra el formulario y oculta la edición
  mostrarFormulario(): void {
    this.mostrarFormularioDiv = true;
    this.mostrarReporteDiv = false;
  }

  // Muestra la edición y oculta el formulario
  mostrarReporte(): void {
    this.mostrarFormularioDiv = false;
    this.mostrarReporteDiv = true;
  }
}

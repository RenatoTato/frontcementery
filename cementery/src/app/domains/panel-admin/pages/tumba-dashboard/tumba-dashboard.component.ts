import { Component } from '@angular/core';
import { TumbaFormComponent } from "../../components/tumbas/tumba/tumbaForm.component";
import { LoteReporteComponent } from "../../components/tumbas/lote-reporte/lote-reporte.component";
import { CommonModule } from '@angular/common';
import { TumbaReporteComponent } from "../../components/tumbas/tumba-reporte/tumba-reporte.component";

@Component({
  selector: 'app-tumba-dashboard',
  standalone: true,
  imports: [TumbaFormComponent, LoteReporteComponent, CommonModule, TumbaReporteComponent],
  templateUrl: './tumba-dashboard.component.html',
  styleUrl: './tumba-dashboard.component.css'
})
export class TumbaDashboardComponent {
  mostrarFormularioDiv: boolean = true;
  mostrarReporteLoteDiv: boolean = false;
  mostrarReporteTumbaDiv: boolean = false;

  // Muestra el formulario y oculta la edición
  mostrarFormulario(): void {
    this.mostrarFormularioDiv = true;
    this.mostrarReporteLoteDiv = false;
    this.mostrarReporteTumbaDiv= false;
  }

  // Muestra la edición y oculta el formulario
  mostrarReporteLote(): void {
    this.mostrarFormularioDiv = false;
    this.mostrarReporteLoteDiv = true;
    this.mostrarReporteTumbaDiv= false;
  }

  // Muestra la edición y oculta el formulario
  mostrarReporteTumba(): void {
    this.mostrarFormularioDiv = false;
    this.mostrarReporteLoteDiv = false;
    this.mostrarReporteTumbaDiv= true;
  }
}

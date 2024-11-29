import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioReporteComponent } from '@admin/components/servicios/servicio-reporte/servicio-reporte.component';
import { TumbaReporteComponent } from "@admin/components/tumbas/tumba-reporte/tumba-reporte.component";
import { DifuntoReporteComponent } from "@admin/components/difuntos/difunto-reporte/difunto-reporte.component";
import { LoteReporteComponent } from "@admin/components/tumbas/lote-reporte/lote-reporte.component";

@Component({
  selector: 'app-iglesia',
  standalone: true,
  imports: [CommonModule, ServicioReporteComponent, TumbaReporteComponent, DifuntoReporteComponent, LoteReporteComponent],
  templateUrl: './iglesia.component.html',
  styleUrl: './iglesia.component.css'
})
export class IglesiaComponent {
  // Estado actual del componente
  estadoActual: 'reporteServicio' | 'reporteLote' | 'reporteTumba'| 'reporteDifunto'= 'reporteServicio';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'reporteServicio' | 'reporteLote' | 'reporteTumba'|'reporteDifunto'): void {
    this.estadoActual = nuevoEstado;
  }

  // Métodos de conveniencia
  mostrarReporteServicio(): void {
    this.cambiarEstado('reporteServicio');
  }
  // Métodos de conveniencia
  mostrarReporteDifunto(): void {
    this.cambiarEstado('reporteDifunto');
  }
  // Métodos de conveniencia
  mostrarReporteTumba(): void {
    this.cambiarEstado('reporteTumba');
  }
  // Métodos de conveniencia
  mostrarReporteLote(): void {
    this.cambiarEstado('reporteLote');
  }
}

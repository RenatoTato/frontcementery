import { Component } from '@angular/core';
import { TumbaFormComponent } from "../../components/tumbas/tumba/tumbaForm.component";
import { LoteReporteComponent } from "../../components/tumbas/lote-reporte/lote-reporte.component";
import { CommonModule } from '@angular/common';
import { TumbaReporteComponent } from "../../components/tumbas/tumba-reporte/tumba-reporte.component";
import { TumbaEditarComponent } from "../../components/tumbas/tumba-editar/tumba-editar.component";
import { LoteFormComponent } from "../../components/tumbas/lote/loteForm.component";
import { LoteEditarComponent } from "../../components/tumbas/lote-editar/lote-editar.component";

@Component({
  selector: 'app-tumba-dashboard',
  standalone: true,
  imports: [TumbaFormComponent, LoteReporteComponent, CommonModule, TumbaReporteComponent, TumbaEditarComponent, LoteFormComponent, LoteEditarComponent],
  templateUrl: './tumba-dashboard.component.html',
  styleUrl: './tumba-dashboard.component.css'
})
export class TumbaDashboardComponent {

  // Estado actual del componente
  estadoActual: 'formularioTumba' | 'formularioLote' | 'edicionLote' | 'edicionTumba' | 'reporteTumba'| 'reporteLote' = 'formularioTumba';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'formularioTumba' | 'formularioLote' | 'edicionLote' | 'edicionTumba' | 'reporteTumba'| 'reporteLote'): void {
    this.estadoActual = nuevoEstado;
  }

  // Métodos de conveniencia
  mostrarFormularioTumba(): void {
    this.cambiarEstado('formularioTumba');
  }

  mostrarFormularioLote(): void {
    this.cambiarEstado('formularioLote');
  }

  mostrarEdicionLote(): void {
    this.cambiarEstado('edicionLote');
  }

  mostrarEdicionTumba(): void {
    this.cambiarEstado('edicionTumba');
  }

  mostrarReporteTumba(): void {
    this.cambiarEstado('reporteTumba');
  }
  mostrarReporteLote(): void {
    this.cambiarEstado('reporteLote');
  }


}

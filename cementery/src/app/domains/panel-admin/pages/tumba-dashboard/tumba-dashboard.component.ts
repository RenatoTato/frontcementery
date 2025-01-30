import { Component } from '@angular/core';
import { TumbaFormComponent } from "../../components/tumbas/tumba/tumbaForm.component";
import { CommonModule } from '@angular/common';
import { TumbaEditarComponent } from "../../components/tumbas/tumba-editar/tumba-editar.component";
import { LoteFormComponent } from "../../components/tumbas/lote/loteForm.component";
import { LoteEditarComponent } from "../../components/tumbas/lote-editar/lote-editar.component";

@Component({
  selector: 'app-tumba-dashboard',
  standalone: true,
  imports: [TumbaFormComponent,  CommonModule,  TumbaEditarComponent, LoteFormComponent, ],
  templateUrl: './tumba-dashboard.component.html',
  styleUrl: './tumba-dashboard.component.css'
})
export class TumbaDashboardComponent {

  // Estado actual del componente
  estadoActual: 'formularioTumba' | 'formularioLote' | 'edicionTumba' = 'formularioLote';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'formularioTumba' | 'formularioLote' |  'edicionTumba' ): void {
    this.estadoActual = nuevoEstado;
  }

  // Métodos de conveniencia
  mostrarFormularioTumba(): void {
    this.cambiarEstado('formularioTumba');
  }

  mostrarFormularioLote(): void {
    this.cambiarEstado('formularioLote');
  }

  mostrarEdicionTumba(): void {
    this.cambiarEstado('edicionTumba');
  }
}

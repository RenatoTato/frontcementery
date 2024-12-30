import { Component } from '@angular/core';
// import { ServicioHistorialComponent } from "../../components/auditorias/servicio-auditoria/servicio-historial/servicio-historial.component";
// import { LoteHistorialComponent } from "../../components/auditorias/tumba-auditoria/lote-historial/lote-historial.component";
// import { TumbaHistorialComponent } from "../../components/auditorias/tumba-auditoria/tumba-historial/tumba-historial.component";
import { DifuntoHistorialComponent } from "../../components/auditorias/difunto-auditoria/difunto-historial/difunto-historial.component";
// import { DeudoHistorialComponent } from "../../components/auditorias/difunto-auditoria/deudo-historial/deudo-historial.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [DifuntoHistorialComponent, CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {

  // Estado actual del componente
  estadoActual: 'HistorialDeudo' | 'HistorialDifunto' | 'HistorialTumba' | 'HistorialLote' | 'HistorialSevicio' = 'HistorialDeudo';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'HistorialDeudo' | 'HistorialDifunto' | 'HistorialTumba' | 'HistorialLote' | 'HistorialSevicio'): void {
    this.estadoActual = nuevoEstado;
  }

  // Métodos de conveniencia
  mostrarHistorialDeudo(): void {
    this.cambiarEstado('HistorialDeudo');
  }

  mostrarHistorialDifunto(): void {
    this.cambiarEstado('HistorialDifunto');
  }

  mostrarHistorialTumba(): void {
    this.cambiarEstado('HistorialTumba');
  }

  mostrarHistorialLote(): void {
    this.cambiarEstado('HistorialLote');
  }

  mostrarHistorialServicio(): void {
    this.cambiarEstado('HistorialSevicio');
  }


}


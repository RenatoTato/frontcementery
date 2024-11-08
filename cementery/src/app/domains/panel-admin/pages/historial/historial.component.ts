import { Component } from '@angular/core';
import { ServicioHistorialComponent } from "../../components/auditorias/servicio-auditoria/servicio-historial/servicio-historial.component";
import { LoteHistorialComponent } from "../../components/auditorias/tumba-auditoria/lote-historial/lote-historial.component";
import { TumbaHistorialComponent } from "../../components/auditorias/tumba-auditoria/tumba-historial/tumba-historial.component";
import { DifuntoHistorialComponent } from "../../components/auditorias/difunto-auditoria/difunto-historial/difunto-historial.component";
import { DeudoHistorialComponent } from "../../components/auditorias/difunto-auditoria/deudo-historial/deudo-historial.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [ServicioHistorialComponent, LoteHistorialComponent, TumbaHistorialComponent, DifuntoHistorialComponent, DeudoHistorialComponent, CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {

  mostrarHistorialDeudoDiv: boolean = true;
  mostrarHistorialDifuntoDiv: boolean = false;
  mostrarHistorialTumbaDiv: boolean = false;
  mostrarHistorialLoteDiv: boolean = false;
  mostrarHistorialSevicioDiv: boolean = false;


  // Muestra el historia deudo
  mostrarHistorialDeudo(): void {
    this.mostrarHistorialDeudoDiv = true;
    this.mostrarHistorialDifuntoDiv = false;
    this.mostrarHistorialTumbaDiv = false;
    this.mostrarHistorialLoteDiv = false;
    this.mostrarHistorialSevicioDiv = false;
  }
  // Muestra el historia deudo
  mostrarHistorialDifunto(): void {
    this.mostrarHistorialDeudoDiv = false;
    this.mostrarHistorialDifuntoDiv = true;
    this.mostrarHistorialTumbaDiv = false;
    this.mostrarHistorialLoteDiv = false;
    this.mostrarHistorialSevicioDiv = false;
  }
  // Muestra el historia deudo
  mostrarHistorialTumba(): void {
    this.mostrarHistorialDeudoDiv = false;
    this.mostrarHistorialDifuntoDiv = false;
    this.mostrarHistorialTumbaDiv = true;
    this.mostrarHistorialLoteDiv = false;
    this.mostrarHistorialSevicioDiv = false;
  }
  // Muestra el historia deudo
  mostrarHistorialLote(): void {
    this.mostrarHistorialDeudoDiv = false;
    this.mostrarHistorialDifuntoDiv = false;
    this.mostrarHistorialTumbaDiv = false;
    this.mostrarHistorialLoteDiv = true;
    this.mostrarHistorialSevicioDiv = false;
  }
  // Muestra el historia deudo
  mostrarHistorialServicio(): void {
    this.mostrarHistorialDeudoDiv = false;
    this.mostrarHistorialDifuntoDiv = false;
    this.mostrarHistorialTumbaDiv = false;
    this.mostrarHistorialLoteDiv = false;
    this.mostrarHistorialSevicioDiv = true;
  }

}


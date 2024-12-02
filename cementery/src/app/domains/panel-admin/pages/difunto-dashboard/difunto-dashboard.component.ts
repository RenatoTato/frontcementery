import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifuntoFormComponent } from "@admin/components/difuntos/difuntoForm/difuntoForm.component";
import { DeudoFormComponent } from "@admin/components/difuntos/deudoForm/deudoForm.component";
import { DifuntoEditarComponent } from "../../components/difuntos/difunto-editar/difunto-editar.component";

import { DeudoEditarComponent } from "../../components/difuntos/deudo-editar/deudo-editar.component";
@Component({
  selector: 'app-difunto-dashboard',
  standalone: true,
  imports: [CommonModule, DifuntoFormComponent, DeudoFormComponent, DifuntoEditarComponent,  DeudoEditarComponent],
  templateUrl: './difunto-dashboard.component.html',
  styleUrl: './difunto-dashboard.component.css'
})
export class DifuntoDashboardComponent {
  // Estado actual del componente
  estadoActual: 'formularioDeudo' | 'formularioDifunto' | 'edicionDifunto' | 'edicionDeudo' = 'formularioDeudo';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'formularioDeudo' | 'formularioDifunto' | 'edicionDifunto' | 'edicionDeudo'): void {
    this.estadoActual = nuevoEstado;
  }

  // Métodos de conveniencia
  mostrarFormularioDeudo(): void {
    this.cambiarEstado('formularioDeudo');
  }

  mostrarFormularioDifunto(): void {
    this.cambiarEstado('formularioDifunto');
  }

  mostrarEdicionDifunto(): void {
    this.cambiarEstado('edicionDifunto');
  }

  mostrarEdicionDeudo(): void {
    this.cambiarEstado('edicionDeudo');
  }  
}
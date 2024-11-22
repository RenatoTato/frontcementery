import { Component } from '@angular/core';
import { ObituarioFormComponent } from "../../components/obituarios/obituario/obituarioForm.component";
import { EtapaFormComponent } from "../../components/obituarios/etapa/etapaForm.component";
import { ObituarioEditarComponent } from '@admin/components/obituarios/obituario-editar/obituario-editar.component';
import { EtapaEditarComponent } from '@admin/components/obituarios/etapa-editar/etapa-editar.component';
import { CommonModule } from '@angular/common';
import { MemoriaEditarComponent } from "../../components/obituarios/memoria-editar/memoria-editar.component";

@Component({
  selector: 'app-Obituario-dashboard',
  standalone: true,
  imports: [ObituarioFormComponent, EtapaFormComponent, ObituarioEditarComponent, CommonModule, MemoriaEditarComponent, EtapaEditarComponent],
  templateUrl: './obituario-dashboard.component.html',
  styleUrl: './obituario-dashboard.component.css'
})
export class ObituarioDashboardComponent {

  // Estado actual del componente
  estadoActual: 'formularioEtapa' | 'formularioObituario' | 'edicionObituario' | 'edicionEtapa' | 'memoria' = 'formularioEtapa';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'formularioEtapa' | 'formularioObituario' | 'edicionObituario' | 'edicionEtapa' | 'memoria'): void {
    this.estadoActual = nuevoEstado;
  }

  // Métodos de conveniencia
  mostrarFormularioEtapa(): void {
    this.cambiarEstado('formularioEtapa');
  }

  mostrarFormularioObituario(): void {
    this.cambiarEstado('formularioObituario');
  }

  mostrarEdicionObituario(): void {
    this.cambiarEstado('edicionObituario');
  }

  mostrarEdicionEtapa(): void {
    this.cambiarEstado('edicionEtapa');
  }

  mostrarEdicionMemoria(): void {
    this.cambiarEstado('memoria');
  }
  
}
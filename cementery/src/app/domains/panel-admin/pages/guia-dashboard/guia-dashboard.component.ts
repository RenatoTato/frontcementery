import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoFormComponent } from '@admin/components/infos/infoForm/infoForm.component'; 
import { InfoEditarComponent } from '@admin/components/infos/info-editar/info-editar.component'; 

@Component({
  selector: 'app-guia-dashboard',
  standalone: true,
  imports: [CommonModule, InfoFormComponent, InfoEditarComponent],
  templateUrl: './guia-dashboard.component.html',
  styleUrl: './guia-dashboard.component.css'
})
export class GuiaDashboardComponent {

  // Estado actual del componente
  estadoActual: 'formularioInfo' | 'edicionInfo' = 'formularioInfo';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'formularioInfo' | 'edicionInfo'): void {
    this.estadoActual = nuevoEstado;
  }


  mostrarFormularioInfo(): void {
    this.cambiarEstado('formularioInfo');
  }

  mostrarEdicionInfo(): void {
    this.cambiarEstado('edicionInfo');
  }
}
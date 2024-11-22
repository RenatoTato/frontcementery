import { Component } from '@angular/core';
import { GuiaFormComponent } from "../../components/guias/guiaForm/guiaForm.component";
import { GuiaEditarComponent } from "../../components/guias/guia-editar/guia-editar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guia-dashboard',
  standalone: true,
  imports: [GuiaFormComponent, GuiaEditarComponent, CommonModule],
  templateUrl: './guia-dashboard.component.html',
  styleUrl: './guia-dashboard.component.css'
})
export class GuiaDashboardComponent {

// Estado actual del componente
estadoActual:  'formularioGuia' | 'edicionGuia'  = 'formularioGuia' ;

// Método genérico para cambiar el estado
cambiarEstado(nuevoEstado:  'formularioGuia' | 'edicionGuia' ): void {
  this.estadoActual = nuevoEstado;
}

// Métodos de conveniencia

mostrarFormularioGuia(): void {
  this.cambiarEstado('formularioGuia');
}

mostrarEdicionGuia(): void {
  this.cambiarEstado('edicionGuia');
}

}
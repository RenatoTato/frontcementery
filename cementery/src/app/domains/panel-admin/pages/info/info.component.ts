import { Component } from '@angular/core';
import { InfoFormComponent } from "../../components/infos/infoForm/infoForm.component";
import { InfoEditarComponent } from '@admin/components/infos/info-editar/info-editar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [InfoFormComponent, InfoEditarComponent, CommonModule ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

 // Estado actual del componente
 estadoActual:  'formularioInfo'| 'edicionInfo'= 'formularioInfo';

 // Método genérico para cambiar el estado
 cambiarEstado(nuevoEstado: 'formularioInfo'|'edicionInfo'): void {
   this.estadoActual = nuevoEstado;
 }


 mostrarFormularioInfo(): void {
   this.cambiarEstado('formularioInfo');
 }

 mostrarEdicionInfo(): void {
   this.cambiarEstado('edicionInfo');
 }
}

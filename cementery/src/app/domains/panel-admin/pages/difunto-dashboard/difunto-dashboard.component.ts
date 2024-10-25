import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifuntoFormComponent } from "@admin/components/difuntos/difuntoForm/difuntoForm.component";
import { DeudoFormComponent } from "@admin/components/difuntos/deudoForm/deudoForm.component";
import { DifuntoEditarComponent } from "../../components/difuntos/difunto-editar/difunto-editar.component";
@Component({
  selector: 'app-difunto-dashboard',
  standalone: true,
  imports: [CommonModule, DifuntoFormComponent, DeudoFormComponent, DifuntoEditarComponent],
  templateUrl: './difunto-dashboard.component.html',
  styleUrl: './difunto-dashboard.component.css'
})
export class DifuntoDashboardComponent {
  mostrarFormularioDiv: boolean = true;
  mostrarEdicionDiv: boolean = false;

  // Muestra el formulario y oculta la edición
  mostrarFormulario(): void {
    this.mostrarFormularioDiv = true;
    this.mostrarEdicionDiv = false;
  }

  // Muestra la edición y oculta el formulario
  mostrarEdicion(): void {
    this.mostrarFormularioDiv = false;
    this.mostrarEdicionDiv = true;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DifuntoFormComponent } from "@admin/components/difuntos/difuntoForm/difuntoForm.component";
import { DeudoFormComponent } from "@admin/components/difuntos/deudoForm/deudoForm.component";
@Component({
  selector: 'app-difunto-dashboard',
  standalone: true,
  imports: [CommonModule, DifuntoFormComponent, DeudoFormComponent],
  templateUrl: './difunto-dashboard.component.html',
  styleUrl: './difunto-dashboard.component.css'
})
export class DifuntoDashboardComponent {
  


}


import { Component } from '@angular/core';
import { ObituarioFormComponent } from "../../components/obituarios/obituario/obituarioForm.component";
import { EtapaFormComponent } from "../../components/obituarios/etapa/etapaForm.component";

@Component({
  selector: 'app-Obituario-dashboard',
  standalone: true,
  imports: [ObituarioFormComponent, EtapaFormComponent],
  templateUrl: './obituario-dashboard.component.html',
  styleUrl: './obituario-dashboard.component.css'
})
export class ObituarioDashboardComponent {

}

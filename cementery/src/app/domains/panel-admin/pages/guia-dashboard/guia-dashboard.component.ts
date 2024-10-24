import { Component } from '@angular/core';
import { GuiaFormComponent } from "../../components/guias/guiaForm/guiaForm.component";

@Component({
  selector: 'app-guia-dashboard',
  standalone: true,
  imports: [GuiaFormComponent],
  templateUrl: './guia-dashboard.component.html',
  styleUrl: './guia-dashboard.component.css'
})
export class GuiaDashboardComponent {

}

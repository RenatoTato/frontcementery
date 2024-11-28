import { Component } from '@angular/core';
import { GuiasInfoComponent } from "../../component/guias-info/guias-info.component";

@Component({
  selector: 'app-guias',
  standalone: true,
  imports: [GuiasInfoComponent],
  templateUrl: './guias.component.html',
  styleUrl: './guias.component.css'
})
export class GuiasComponent {

}

import { Component } from '@angular/core';
import { ServiceInfoComponent } from "../../component/service-info/service-info.component";

@Component({
  selector: 'app-servi-info',
  standalone: true,
  imports: [ServiceInfoComponent],
  templateUrl: './servi-info.component.html',
  styleUrl: './servi-info.component.css'
})
export class ServiInfoComponent {

}

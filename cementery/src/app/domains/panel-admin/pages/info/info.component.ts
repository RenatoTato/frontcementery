import { Component } from '@angular/core';
import { InfoFormComponent } from "../../components/infos/infoForm/infoForm.component";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [InfoFormComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

}

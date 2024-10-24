import { Component } from '@angular/core';
import { IglesiaFormComponent } from "../../components/iglesias/iglesiaForm/iglesiaForm.component";

@Component({
  selector: 'app-iglesia',
  standalone: true,
  imports: [IglesiaFormComponent],
  templateUrl: './iglesia.component.html',
  styleUrl: './iglesia.component.css'
})
export class IglesiaComponent {

}

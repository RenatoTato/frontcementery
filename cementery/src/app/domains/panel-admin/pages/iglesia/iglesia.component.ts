import { Component } from '@angular/core';
import { IglesiaFormComponent } from "@admin/components/iglesias/iglesiaForm/iglesiaForm.component";
import { ParroquiaFormComponent } from "@admin/components/iglesias/parroquiaForm/parroquiaForm.component";

@Component({
  selector: 'app-iglesia',
  standalone: true,
  imports: [IglesiaFormComponent, ParroquiaFormComponent],
  templateUrl: './iglesia.component.html',
  styleUrl: './iglesia.component.css'
})
export class IglesiaComponent {

}

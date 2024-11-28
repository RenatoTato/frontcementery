import { Component } from '@angular/core';
import { ArticuloPinfoComponent } from '@info/component/articulo-pinfo/articulo-pinfo.component'; 

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [ArticuloPinfoComponent],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.css'
})
export class ArticulosComponent {

}

import { Component } from '@angular/core';
import { ArticuloFormComponent } from '@admin/components/articulos/articuloForm/articuloForm.component';
@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [ArticuloFormComponent],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
}
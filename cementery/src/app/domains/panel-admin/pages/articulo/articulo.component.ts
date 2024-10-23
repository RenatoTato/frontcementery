import { Component } from '@angular/core';
import { ArticuloFormComponent } from '@admin/components/articulos/articuloForm/articuloForm.component';
import { SeccionFormComponent } from "@admin/components/articulos/seccionForm/seccionForm.component";
@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [ArticuloFormComponent, SeccionFormComponent],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
}
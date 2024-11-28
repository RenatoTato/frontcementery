import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Articulo } from '@externo/models/articulo/articulo.model';

@Component({
  selector: 'app-articulo-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articulo-info.component.html',
  styleUrl: './articulo-info.component.css'
})
export class ArticuloInfoComponent {
  @Input() articulo!: Articulo;
}

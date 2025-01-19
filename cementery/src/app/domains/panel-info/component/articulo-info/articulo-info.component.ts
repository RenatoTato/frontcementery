import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Articulo } from '@externo/models/articulo/articulo.model';

@Component({
  selector: 'app-articulo-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articulo-info.component.html',
  styleUrl: './articulo-info.component.css'
})
export class ArticuloInfoComponent {
  @Input() articulos: Articulo[] = [];
  @Input() paginacion = false;
  @Input() page = 1;
  @Input() pageSize = 6;
  @Input() totalArticulos = 0;
  @Input() onPageChange!: (page: number) => void;
  @Input() columns: string = 'grid-cols-3';

  @Output() onArticuloSeleccionado = new EventEmitter<number>();

  verArticulo(id: number): void {
    this.onArticuloSeleccionado.emit(id); // Emite el ID del artículo seleccionado
  }
  handleKeyPress(event: KeyboardEvent, id: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.verArticulo(id); // Llama a la función asociada al clic
      event.preventDefault(); // Previene comportamientos no deseados, como el desplazamiento.
    }
  }

  // Llamada al método en el evento de cambio de página
  cambiarPagina(page: number): void {
    this.onPageChange(page); // Notifica al componente padre
  }
}
import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '@externo/services/articulo.service';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { ArticuloFilter } from '@externo/models/articulo/articulob.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articulo-pinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articulo-pinfo.component.html',
  styleUrl: './articulo-pinfo.component.css'
})
export class ArticuloPinfoComponent implements OnInit {
  articulos: Articulo[] = []; // Lista de artículos
  categorias: string[] = []; // Categorías únicas extraídas de los artículos
  filtro: ArticuloFilter = {}; // Filtros para artículos
  page = 1; // Página actual
  pageSize = 6; // Tamaño de la página
  totalArticulos = 0; // Total de artículos para paginación

  constructor(private articuloService: ArticuloService) {}

  ngOnInit(): void {
    this.cargarCategorias(); // Cargar categorías al inicio
    this.cargarArticulos(); // Cargar artículos al inicio
  }

  // Cargar los artículos con filtros y paginación
  
  cargarCategorias(): void {
    this.articuloService.getReadArticulos({}).subscribe((articulos) => {
      const categorias = new Set(
        articulos.map((articulo) => articulo.category).filter((categoria) => !!categoria)
      );
      this.categorias = Array.from(categorias);
    });
  }
  // Método para cargar los artículos con filtros
  cargarArticulos(): void {
    this.articuloService
      .getArticulos(this.page, this.pageSize, this.filtro)
      .subscribe((data) => {
        if ('results' in data) {
          this.articulos = data.results;
          this.totalArticulos = data.count;
        } else {
          this.articulos = data;
          this.totalArticulos = data.length;
        }
      });
  }

  // Método para filtrar artículos por categoría
  filtrarPorCategoria(categoria: string): void {
    this.filtro.category = categoria; // Actualizar filtro de categoría
    this.page = 1; // Reiniciar a la primera página
    this.cargarArticulos(); // Recargar artículos con el nuevo filtro
  }
  // Generar categorías únicas a partir de los artículos cargados
  generarCategorias(): void {
    const categoriasSet = new Set(
      this.articulos.map((articulo) => articulo.category)
    );
    this.categorias = Array.from(categoriasSet); // Convertir el Set a Array
  }


  // Buscar por título
  buscarPorTitulo(titulo: string): void {
    this.filtro.title = titulo; // Actualizar filtro de título
    this.page = 1; // Reiniciar a la primera página
    this.cargarArticulos(); // Recargar artículos
  }

  // Cambiar página (para la paginación)
  cambiarPagina(event: any): void {
    this.page = event.page; // Actualizar la página actual
    this.cargarArticulos(); // Recargar artículos
  }
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Forzar el tipo
    this.buscarPorTitulo(inputElement?.value || '');
  }
}
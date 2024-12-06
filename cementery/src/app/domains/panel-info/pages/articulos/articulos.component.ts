import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '@externo/services/articulo.service';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { ArticuloFilter } from '@externo/models/articulo/articulob.model';
import { Seccion } from '@externo/models/articulo/seccion.model';
import { SeccionFilter } from '@externo/models/articulo/seccionb.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticuloInfoComponent } from "@info/component/articulo-info/articulo-info.component";

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule, ArticuloInfoComponent],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.css'
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = []; // Lista de artículos
  categorias: string[] = []; // Categorías únicas extraídas de los artículos
  filtro: ArticuloFilter = {}; // Filtros para artículos
  page = 1; // Página actual
  pageSize = 10; // Tamaño de la página
  totalArticulos = 0; // Total de artículos para paginación
  articuloSeleccionadoId: number | null = null; // Artículo seleccionado
  articulo!: Articulo; // Detalles del artículo
  secciones: Seccion[] = []; // Secciones relacionadas

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articuloService: ArticuloService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del artículo de los parámetros de la ruta
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null; // Convertir el parámetro en número si existe
      if (id) {
        this.articuloSeleccionadoId = id;
        this.verArticulo(id); // Cargar los detalles del artículo
      } else {
        this.cargarArticulos(); // Cargar la lista completa de artículos
      }
    });
    this.cargarCategorias(); // Siempre carga las categorías
  }

  verArticulo(id: number): void {
    this.router.navigate(['/articulos', id]); // Navega a la ruta con el ID
    this.cargarArticulo(id)
  }
  volverALaLista(): void {
    this.router.navigate(['/articulos']); // Redirige a la vista principal de artículos
    this.articuloSeleccionadoId = null; // Limpia la selección
    this.articulo = {} as Articulo; // Limpia los datos del artículo
    this.secciones = []; // Limpia las secciones relacionadas
    this.cargarArticulos(); // Recarga la lista de artículos
  }
  cargarSecciones(articleId: number): void {
    const filterParams: SeccionFilter = { article: articleId };
    this.articuloService.getReadSeccions(filterParams).subscribe((secciones) => {
      this.secciones = secciones; // Asigna las secciones relacionadas
    });
  }

  // Cargar los artículos con filtros y paginación

  cargarCategorias(): void {
    this.articuloService.getReadArticulos().subscribe((articulos) => {
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
        if (Array.isArray(data)) {
          // Sin paginación
          this.articulos = data;
          this.totalArticulos = data.length;
        } else {
          // Con paginación
          this.articulos = data.results;
          this.totalArticulos = data.count;
        }
      }, (error) => {
        console.error('Error al cargar artículos:', error);
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
  cambiarPagina(page: number): void {
    this.page = page; // Actualiza la página actual
    this.cargarArticulos(); // Recarga los artículos para la nueva página
  }
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Forzar el tipo
    this.buscarPorTitulo(inputElement?.value || '');
  }
  cargarArticulo(id: number): void {
    this.articuloService.getArticuloId(id).subscribe((data) => {
      this.articulo = data; // Asigna los datos del artículo
      this.cargarSecciones(id); // Carga las secciones relacionadas
    }, (error) => {
      console.error(`Error al cargar el artículo con ID ${id}:`, error);
    });
  }

}
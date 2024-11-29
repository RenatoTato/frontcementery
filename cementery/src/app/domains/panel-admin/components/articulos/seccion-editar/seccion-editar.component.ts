import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ArticuloService } from '@externo/services/articulo.service';
import { Seccion } from '@externo/models/articulo/seccion.model';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { SeccionFilter } from '@externo/models/articulo/seccionb.model';

@Component({
  selector: 'app-seccion-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './seccion-editar.component.html',
  styleUrl: './seccion-editar.component.css'
})
export class SeccionEditarComponent implements OnInit {
  secciones: Seccion[] = [];
  articulos: Articulo[] = [];
  paginatedSecciones: Seccion[] = [];
  seccionEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};
  showFilters:boolean=false;

  filterFields = [
    { name: 'subtitle', label: 'Subtítulo' },
    { name: 'content', label: 'Contenido' },
    { name: 'article', label: 'Artículo' },
  ];

  tableHeaders = ['Subtítulo', 'Contenido', 'Artículo'];
  editableFields: (keyof Seccion)[] = ['subtitle', 'content', 'article'];

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSecciones(this.currentPage, this.pageSize);
    this.loadArticulos();
  }

  initForm(): void {
    this.seccionEditarForm = this.fb.group({
      subtitle: [''],
      content: [''],
      article: [''],
    });
  }

  loadArticulos(): void {
    this.articuloService.getReadArticulos().subscribe(
      (articulos: Articulo[]) => {
        this.articulos = articulos;
      },
      (error) => console.error('Error al obtener los artículos:', error)
    );
  }
  loadReadSeccion(): void {
    this.articuloService.getReadSeccions().subscribe(
      (secciones: Seccion[]) => {
        this.secciones = secciones;
      },
      (error) => console.error('Error al obtener los artículos:', error)
    );
  }

  loadSecciones(page: number, pageSize: number, filterParams?: SeccionFilter): void {
    this.articuloService.getSeccions(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.secciones = response.results;
          this.totalItems = response.count;
        } else {
          this.secciones = response;
          this.totalItems = this.secciones.length;
        }
        this.paginatedSecciones = this.secciones;
        this.paginatedSecciones.forEach((item) => {
          if (item.article && typeof item.article === 'number') {
            this.articuloService.getArticuloId(item.article).subscribe(
              (articulo: Articulo) => {
                item.articuloDetails = articulo.title;
              },
              (error) => {
                console.error(`Error al cargar la tumba con ID ${item.article}:`, error);
                item.articuloDetails = 'Información no disponible';
              }
            );
          }
        });
      },
      (error) => console.error('Error al cargar las secciones:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.seccionEditarForm.value;
    this.loadSecciones(this.currentPage, this.pageSize, filterParams);
  }

  toggleEdit(seccion: Seccion, isEditing: boolean): void {
    this.editingStates[seccion.id] = isEditing;
  }

  isEditing(seccion: Seccion): boolean {
    return this.editingStates[seccion.id] || false;
  }
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  saveSeccion(seccion: Seccion): void {
    if (!seccion.id) {
      console.error('El ID de la sección es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta sección?')) {
      this.articuloService.updateSeccion(seccion.id, seccion).subscribe(
        () => {
          this.editingStates[seccion.id] = false;
          this.loadSecciones(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la sección:', error)
      );
    }
  }

  deleteSeccion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta sección?')) {
      this.articuloService.deleteSeccion(id).subscribe(
        () => this.loadSecciones(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la sección:', error)
      );
    }
  }

  resetFilters(): void {
    this.seccionEditarForm.reset();
    this.loadSecciones(1, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadSecciones(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadSecciones(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadSecciones(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadSecciones(this.currentPage, this.pageSize);
  }
}
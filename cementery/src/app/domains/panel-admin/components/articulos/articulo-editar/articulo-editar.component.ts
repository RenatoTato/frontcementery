import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ArticuloService } from '@externo/services/articulo.service';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { ArticuloFilter } from '@externo/models/articulo/articulob.model';

@Component({
  selector: 'app-articulo-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './articulo-editar.component.html',
  styleUrl: './articulo-editar.component.css'
})
export class ArticuloEditarComponent  implements OnInit {
  articulos: Articulo[] = [];
  paginatedArticulos: Articulo[] = [];
  articuloEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};
  selectedFile: File | null = null;
  showFilters: boolean = false;

  filterFields = [
    { name: 'title', label: 'Título' },
    { name: 'author', label: 'Autor' },
    { name: 'category', label: 'Categoría' },
    { name: 'is_featured', label: 'Destacado' },
    { name: 'publication_date', label: 'Fecha de publicación' },
  ];

  filterOptions = {
    is_featured: [
      { value: '', label: 'Todos' },
      { value: true, label: 'Destacado' },
      { value: false, label: 'No destacado' }
    ]
  };


  tableHeaders = ['Título', 'Autor', 'Categoría', 'Destacado', 'Fecha de publicación', 'Descripción', 'Imagen'];
  editableFields: (keyof Articulo)[] = ['title', 'author', 'category', 'is_featured', 'publication_date', 'description','image'];

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadArticulos(this.currentPage, this.pageSize);
  }

  initForm(): void {
    this.articuloEditarForm = this.fb.group({
      title: [''],
      author: [''],
      category: [''],
      is_featured: [''],
      publication_date: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  loadArticulos(page: number, pageSize: number, filterParams?: ArticuloFilter): void {
    this.articuloService.getArticulos(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.articulos = response.results;
          this.totalItems = response.count;
        } else {
          this.articulos = response;
          this.totalItems = this.articulos.length;
        }
        this.paginatedArticulos = this.articulos;
      },
      (error) => console.error('Error al cargar los artículos:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.articuloEditarForm.value;
    this.loadArticulos(this.currentPage, this.pageSize, filterParams);
  }

  resetFilters(): void {
    this.articuloEditarForm.reset();
    this.loadArticulos(1, this.pageSize);
  }
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  saveArticulo(articulo: Articulo): void {
    if (!articulo.id) {
      console.error('El ID del artículo es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar este artículo?')) {
      this.articuloService.updateArticulo(articulo.id, articulo, this.selectedFile).subscribe(
        () => {
          this.editingStates[articulo.id] = false;
          this.loadArticulos(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar el artículo:', error)
      );
    }
  }

  deleteArticulo(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      this.articuloService.deleteArticulo(id).subscribe(
        () => this.loadArticulos(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar el artículo:', error)
      );
    }
  }

  toggleEdit(articulo: Articulo, isEditing: boolean): void {
    this.editingStates[articulo.id] = isEditing;
  }

  isEditing(articulo: Articulo): boolean {
    return this.editingStates[articulo.id] || false;
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadArticulos(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadArticulos(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadArticulos(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadArticulos(this.currentPage, this.pageSize);
  }
}

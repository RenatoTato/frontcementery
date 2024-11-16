import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DifuntoService } from '@externo/services/difunto.service';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { DifuntoFilter } from '@externo/models/difunto/difuntob.model';


@Component({
  selector: 'app-difunto-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './difunto-editar.component.html',
  styleUrls: ['./difunto-editar.component.css']
})
export class DifuntoEditarComponent implements OnInit {

  difuntos: Difunto[] = [];
  paginatedDifuntos: Difunto[] = [];
  difuntoEditarForm!: FormGroup;
  isDarkMode: boolean = false;
  currentPage: number = 1;
  pageSize: number = 17;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'names', label: 'Nombre' },
    { name: 'last_names', label: 'Apellidos' },
    { name: 'idNumber', label: 'Cédula' },
    { name: 'requestNumber', label: 'Número de Solicitud' }
  ];

  tableHeaders = ['Nombre', 'Apellido', 'Cédula', 'Solicitud', 'Tumba', 'Deudo'];
  editableFields: (keyof Difunto)[] = ['names', 'last_names', 'idNumber', 'requestNumber', 'tumba', 'deudo'];
  constructor(
    private fb: FormBuilder,
    private difuntoService: DifuntoService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDifuntos(this.currentPage, this.pageSize);
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.difuntoEditarForm = this.fb.group({
      names: ['', Validators.required],
      last_names: ['', Validators.required],
      idNumber: ['', Validators.required],
      requestNumber: ['', Validators.required]
    });
  }

  // Carga los datos de los difuntos con la paginación y filtros
  loadDifuntos(page: number, pageSize: number, filterParams?: DifuntoFilter): void {
    this.difuntoService.getDifuntos(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.difuntos = response.results;
          this.totalItems = response.count;
        } else {
          this.difuntos = response;
          this.totalItems = this.difuntos.length;
        }
        this.paginatedDifuntos = this.difuntos;
      },
      (error) => console.error('Error al cargar los difuntos:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.difuntoEditarForm.value; // Obtiene los valores de filtro
    console.log('Filtrando con parámetros:', filterParams); // Verificación
    this.loadDifuntos(this.currentPage, this.pageSize, filterParams);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadDifuntos(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadDifuntos(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadDifuntos(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadDifuntos(this.currentPage, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  // Resetear filtros
  resetFilters(): void {
    this.difuntoEditarForm.reset();
    this.loadDifuntos(1, this.pageSize);
  }

  // Cambia el estado de edición de un difunto específico
toggleEdit(difunto: Difunto, isEditing: boolean): void {
  this.editingStates[difunto.id] = isEditing; // Usa `editingStates` para controlar el estado de edición
}

// Guarda los cambios y sale del modo edición
saveDifunto(difunto: Difunto): void {
  if (!difunto.id) {
    console.error('El ID del difunto es nulo o indefinido.');
    return;
  }

  if (confirm('¿Estás seguro de que deseas actualizar este difunto?')) {
    this.difuntoService.updateDifunto(difunto.id, difunto).subscribe(
      (response) => {
        this.editingStates[difunto.id] = false; // Desactivar el modo de edición
        console.log('Difunto actualizado correctamente:', response);
        
        // Recarga la lista de difuntos y actualiza la vista
        this.loadDifuntos(this.currentPage, this.pageSize);
        this.cdRef.detectChanges(); // Fuerza la detección de cambios
      },
      (error) => console.error('Error al actualizar el difunto:', error)
    );
  }
}

// Método para verificar si un difunto está en modo de edición
isEditing(difunto: Difunto): boolean {
  return this.editingStates[difunto.id] || false;
}

  // Eliminar un difunto
  deleteDifunto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este difunto?')) {
      this.difuntoService.deleteDifunto(id).subscribe(
        () => this.loadDifuntos(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar el difunto:', error)
      );
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  loadDarkModePreference(): void {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
  
}
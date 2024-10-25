import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DifuntoService } from '@externo/services/difunto.service';
import { TumbaService } from '@externo/services/tumba.service';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
  tumbas: Tumba[] = [];
  deudos: Deudo[] = [];
  difuntoEditarForm!: FormGroup;
  isDarkMode: boolean = false;
  currentPage: number = 1;
  pageSize: number = 17;
  totalItems: number = 0;
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
    private tumbasService: TumbaService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDifuntos(this.currentPage, this.pageSize);;
    this.loadTumbas();
    this.loadDeudos();
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
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  loadDifuntos(page: number, pageSize: number, filterParams?: any): void {
    this.difuntoService.getDifuntos(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.difuntos = response.results; // Accede a la lista de Difuntos en `results`
        this.totalItems = response.count; // Número total de elementos
      },
      (error) => console.error('Error al cargar los difuntos:', error)
    );
  }

  loadTumbas(): void {
    this.tumbasService.getTumbas().subscribe(
      (response: Tumba[]) => (this.tumbas = response),
      (error) => console.error('Error al cargar las tumbas:', error)
    );
  }

  loadDeudos(): void {
    this.difuntoService.getDeudos().subscribe(
      (response: Deudo[]) => (this.deudos = response),
      (error) => console.error('Error al cargar los deudos:', error)
    );
  }

  onSubmit(): void {
    this.loadDifuntos(this.currentPage, this.pageSize, this.difuntoEditarForm.value);
  }

  updatePaginatedDifuntos(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedDifuntos = this.difuntos.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadDifuntos(this.currentPage, this.pageSize);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadDifuntos(this.currentPage, this.pageSize);
    }
  }

  resetFilters(): void {
    this.difuntoEditarForm.reset();
    this.loadDifuntos(this.currentPage, this.pageSize);
  }


  toggleEdit(difunto: Difunto, isEditing: boolean): void {
    difunto.isEditing = isEditing;
  }

  saveDifunto(difunto: Difunto): void {
    if (difunto.id == null) {
      console.error('El ID del difunto es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar este difunto?')) {
      this.difuntoService.updateDifunto(difunto.id, difunto).subscribe(
        (response) => {
          difunto.isEditing = false;
          console.log('Difunto actualizado correctamente:', response);
        },
        (error) => console.error('Error al actualizar el difunto:', error)
      );
    }
  }


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
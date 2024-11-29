import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DifuntoService } from '@externo/services/difunto.service';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { DifuntoFilter } from '@externo/models/difunto/difuntob.model';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { TumbaService } from '@externo/services/tumba.service';


@Component({
  selector: 'app-difunto-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './difunto-editar.component.html',
  styleUrls: ['./difunto-editar.component.css']
})
export class DifuntoEditarComponent implements OnInit {
  tumbas: Tumba[] = [];
  deudos: Deudo[] = [];
  difuntos: Difunto[] = [];
  paginatedDifuntos: Difunto[] = [];
  difuntoEditarForm!: FormGroup;
  isDarkMode: boolean = false;
  currentPage: number = 1;
  pageSize: number = 17;
  totalItems: number = 0;
  showFilters:boolean=false;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'names', label: 'Nombre' },
    { name: 'last_names', label: 'Apellidos' },
    { name: 'idNumber', label: 'Cédula' },
    { name: 'requestNumber', label: 'Número de Solicitud' },
  ];

  tableHeaders = ['Nombre', 'Apellido', 'Cédula', 'Solicitud', 'Tumba', 'Deudo'];
  editableFields: (keyof Difunto)[] = ['names', 'last_names', 'idNumber', 'requestNumber', 'tumba', 'deudo'];
  constructor(
    private fb: FormBuilder,
    private difuntoService: DifuntoService,
    private tumbaService: TumbaService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDifuntos(this.currentPage, this.pageSize);
    this.loadReadDifuntos();
    this.loadDeudos();
    this.loadTumbas();
    this.loadDarkModePreference();
  }
  loadDeudos(): void {
    this.difuntoService.getReadDeudos().subscribe(
      (deudos: Deudo[]) => {
        this.deudos = deudos;
        console.log('deudo:', this.deudos);
      },
      (error) => console.error('Error al obtener las difuntos:', error)
    );
  }
  loadTumbas(): void {
    this.tumbaService.getReadTumbas().subscribe(
      (tumbas: Tumba[]) => {
        this.tumbas = tumbas;
        console.log();
      },
      (error) => console.error('Error al obtener las tumbas:', error)
    );
  }
  initForm(): void {
    this.difuntoEditarForm = this.fb.group({
      names: ['', Validators.required],
      last_names: ['', Validators.required],
      idNumber: ['', Validators.required],
      requestNumber: ['', Validators.required]
    });
  }
  loadReadDifuntos(): void {
    this.difuntoService.getReadDifuntos().subscribe(
      (difuntos: Difunto[]) => {
        this.difuntos = difuntos;
        console.log('difunto:', this.difuntos);
      },
      (error) => console.error('Error al obtener las difuntos:', error)
    );
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
        this.paginatedDifuntos.forEach((item) => {
          console.log('Deudo antes de procesar:', item.deudo);
          if (item.deudo && typeof item.deudo === 'number') {
            const deudo = this.deudos.find((d) => d.id === item.deudo);
            item.deudo_ob = deudo || null; // Asigna el objeto Deudo o null si no se encuentra
          }
          if (item.tumba && typeof item.tumba === 'number') {
            this.tumbaService.getTumbaId(item.tumba).subscribe(
              (tumba: Tumba) => {
                item.tumbaDetails = tumba.description;
              },
              (error) => {
                console.error(`Error al cargar la tumba con ID ${item.tumba}:`, error);
                item.tumbaDetails = 'Información no disponible';
              }
            );
          }
        });
      },
      (error) => console.error('Error al cargar los difuntos:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.difuntoEditarForm.value; // Obtiene los valores de filtro
    console.log('Filtrando con parámetros:', filterParams); // Verificación
    this.loadDifuntos(this.currentPage, this.pageSize, filterParams);
  }
  formatRequestNumber(requestNumber: number): string {
    const formattedNumber = requestNumber.toString().padStart(8, '0');
    return `S${formattedNumber}`;
  }
  // Comparar versiones
  formatIdNumber(requestNumber: number): string {
    const formattedNumber = requestNumber.toString().padStart(10, '0');
    return `${formattedNumber}`;
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

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
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
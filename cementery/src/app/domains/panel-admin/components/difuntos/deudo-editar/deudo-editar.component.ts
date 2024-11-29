import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule,FormsModule, Validators } from '@angular/forms';
import { DifuntoService } from '@externo/services/difunto.service';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { DeudoFilter } from '@externo/models/difunto/deudob.model';

@Component({
  selector: 'app-deudo-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './deudo-editar.component.html',
  styleUrl: './deudo-editar.component.css'
})
export class DeudoEditarComponent implements OnInit {

  deudos: Deudo[] = [];
  paginatedDeudos: Deudo[] = [];
  deudoEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 17;
  totalItems: number = 0;
  showFilters:boolean=false;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'names', label: 'Nombres' },
    { name: 'last_names', label: 'Apellidos' },
    { name: 'idNumber', label: 'Cédula' },
    { name: 'phoneNumber', label: 'Teléfono' },
    { name: 'address', label: 'Dirección' },
    { name: 'tipo', label: 'Relación' },
  ];
  filterOptions = {
    tipo: [
      { value: '', label: 'Todos' },
      { value: 'Allegado', label: 'Allegado' },
      { value: 'Familiar', label: 'Familiar' },
      { value: 'Conocido', label: 'Conocido' }
    ],
  };


  tableHeaders = ['Nombre', 'Apellido', 'Cédula', 'Teléfono','Email', 'Dirección', 'Relación'];
  editableFields: (keyof Deudo)[] = ['names', 'last_names', 'idNumber', 'phoneNumber', 'email', 'address', 'tipo'];

  constructor(
    private fb: FormBuilder,
    private difuntoService: DifuntoService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDeudos(this.currentPage, this.pageSize);
    this.loadReadDeudos();
    this.setupFilterListener();
  }

  initForm(): void {
    this.deudoEditarForm = this.fb.group({
      names: [''],
      last_names: [''],
      idNumber: [''],
      phoneNumber: [''],
      address: [''],
      tipo: ['']
    });
  }

  setupFilterListener(): void {
    this.deudoEditarForm.valueChanges.subscribe((filterParams: DeudoFilter) => {
      this.loadDeudos(1, this.pageSize, filterParams);
    });
  }
  loadReadDeudos(): void {
    this.difuntoService.getReadDeudos().subscribe(
      (deudos: Deudo[]) => {
        this.deudos = deudos;
        console.log('deudo:', this.deudos);
      },
      (error) => console.error('Error al obtener las difuntos:', error)
    );
  }
  loadDeudos(page: number, pageSize: number, filterParams?: DeudoFilter): void {
    this.difuntoService.getDeudos(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.deudos = response.results;
          this.totalItems = response.count;
        } else {
          this.deudos = response;
          this.totalItems = this.deudos.length;
        }
        this.paginatedDeudos = this.deudos;
      },
      (error) => console.error('Error al cargar los deudos:', error)
    );
  }
  onSubmit(): void {
    const filterParams = this.deudoEditarForm.value; // Obtiene los valores de filtro
    console.log('Filtrando con parámetros:', filterParams); // Verificación
    this.loadDeudos(this.currentPage, this.pageSize, filterParams);
  }

  formatIdNumber(requestNumber: number): string {
    const formattedNumber = requestNumber.toString().padStart(10, '0');
    return `${formattedNumber}`;
  }
  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadDeudos(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadDeudos(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadDeudos(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadDeudos(this.currentPage, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  toggleEdit(deudo: Deudo, isEditing: boolean): void {
    this.editingStates[deudo.id] = isEditing;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  isEditing(deudo: Deudo): boolean {
    return this.editingStates[deudo.id] || false;
  }
  // Resetear filtros
  resetFilters(): void {
    this.deudoEditarForm.reset();
    this.loadDeudos(1, this.pageSize);
  }

  saveDeudo(deudo: Deudo): void {
    if (!deudo.id) {
      console.error('El ID del deudo es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar este deudo?')) {
      this.difuntoService.updateDeudo(deudo.id, deudo).subscribe(
        (response) => {
          this.editingStates[deudo.id] = false;
          console.log('Deudo actualizado correctamente:', response);
          this.loadDeudos(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar el deudo:', error)
      );
    }
  }

  deleteDeudo(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este deudo?')) {
      this.difuntoService.deleteDeudo(id).subscribe(
        () => this.loadDeudos(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar el deudo:', error)
      );
    }
  }
}

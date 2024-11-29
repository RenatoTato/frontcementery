import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IglesiaService } from '@externo/services/iglesia.service';
import { Parroquia } from '@externo/models/iglesia/parroquia.model';
import { ParroquiaFilter } from '@externo/models/iglesia/parroquiab.model';

@Component({
  selector: 'app-parroquia-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './parroquia-editar.component.html',
  styleUrl: './parroquia-editar.component.css'
})
export class ParroquiaEditarComponent implements OnInit {
  parroquias: Parroquia[] = [];
  paginatedParroquias: Parroquia[] = [];
  parroquiaEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 17;
  totalItems: number = 0;
  showFilters:boolean=false;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'name', label: 'Nombre' },
    { name: 'churches_number', label: 'Número de Iglesias' },
  ];

  tableHeaders = ['Nombre', 'Número de Iglesias', 'Imagen'];
  editableFields: (keyof Parroquia)[] = ['name', 'churches_number', 'image'];

  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private iglesiaService: IglesiaService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadParroquias(this.currentPage, this.pageSize);
    this.loadReadParroquias();
    this.setupFilterListener();
  }

  initForm(): void {
    this.parroquiaEditarForm = this.fb.group({
      name: [''],
      churches_number: ['']
    });
  }

  setupFilterListener(): void {
    this.parroquiaEditarForm.valueChanges.subscribe((filterParams: ParroquiaFilter) => {
      this.loadParroquias(1, this.pageSize, filterParams);
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  loadReadParroquias(): void {
    this.iglesiaService.getReadParroquias().subscribe(
      (parroquias: Parroquia[]) => {
        this.parroquias = parroquias;
      },
      (error) => console.error('Error al obtener las parroquias:', error)
    );
  }

  loadParroquias(page: number, pageSize: number, filterParams?: ParroquiaFilter): void {
    this.iglesiaService.getParroquias(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.parroquias = response.results;
          this.totalItems = response.count;
        } else {
          this.parroquias = response;
          this.totalItems = this.parroquias.length;
        }
        this.paginatedParroquias = this.parroquias;
      },
      (error) => console.error('Error al cargar las parroquias:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.parroquiaEditarForm.value;
    this.loadParroquias(this.currentPage, this.pageSize, filterParams);
  }

  toggleEdit(parroquia: Parroquia, isEditing: boolean): void {
    this.editingStates[parroquia.id!] = isEditing;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  isEditing(parroquia: Parroquia): boolean {
    return this.editingStates[parroquia.id!] || false;
  }

  saveParroquia(parroquia: Parroquia): void {
    if (!parroquia.id) {
      console.error('El ID de la parroquia es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta parroquia?')) {
      this.iglesiaService.updateParroquia(parroquia.id, parroquia, this.selectedFile).subscribe(
        (response) => {
          this.editingStates[parroquia.id!] = false;
          this.loadParroquias(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la parroquia:', error)
      );
    }
  }

  deleteParroquia(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta parroquia?')) {
      this.iglesiaService.deleteParroquia(id).subscribe(
        () => this.loadParroquias(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la parroquia:', error)
      );
    }
  }

  resetFilters(): void {
    this.parroquiaEditarForm.reset();
    this.loadParroquias(1, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadParroquias(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadParroquias(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadParroquias(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadParroquias(this.currentPage, this.pageSize);
  }
}
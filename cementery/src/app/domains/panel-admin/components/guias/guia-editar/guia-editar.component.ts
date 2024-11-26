import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { GuiaService } from '@externo/services/guia.service';
import { Guia} from '@externo/models/guia/guia.model';
import { GuiaFilter } from '@externo/models/guia/guiab.model';

@Component({
  selector: 'app-guia-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './guia-editar.component.html',
  styleUrl: './guia-editar.component.css'
})
export class GuiaEditarComponent  implements OnInit {
  guias: Guia[] = [];
  paginatedGuias: Guia[] = [];
  guiaEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};
  selectedFile: File | null = null;

  filterFields = [
    { name: 'title', label: 'Título' },
    { name: 'category', label: 'Categoría' },
    { name: 'description_short', label: 'Descripción corta' },
  ];

  tableHeaders = ['Título', 'Categoría', 'Descripción corta', 'Imagen'];
  editableFields: (keyof Guia)[] = ['title', 'category', 'description_short', 'image'];

  constructor(
    private fb: FormBuilder,
    private guiaService: GuiaService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadGuias(this.currentPage, this.pageSize);
  }

  initForm(): void {
    this.guiaEditarForm = this.fb.group({
      title: [''],
      category: [''],
      description_short: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  loadGuias(page: number, pageSize: number, filterParams?: GuiaFilter): void {
    this.guiaService.getGuias(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.guias = response.results;
          this.totalItems = response.count;
        } else {
          this.guias = response;
          this.totalItems = this.guias.length;
        }
        this.paginatedGuias = this.guias;
      },
      (error) => console.error('Error al cargar las guías:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.guiaEditarForm.value;
    this.loadGuias(this.currentPage, this.pageSize, filterParams);
  }

  resetFilters(): void {
    this.guiaEditarForm.reset();
    this.loadGuias(1, this.pageSize);
  }

  saveGuia(guia: Guia): void {
    if (!guia.id) {
      console.error('El ID de la guía es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta guía?')) {
      this.guiaService.updateGuia(guia.id, guia, this.selectedFile).subscribe(
        () => {
          this.editingStates[guia.id!] = false;
          this.loadGuias(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la guía:', error)
      );
    }
  }

  deleteGuia(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta guía?')) {
      this.guiaService.deleteGuia(id).subscribe(
        () => this.loadGuias(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la guía:', error)
      );
    }
  }

  toggleEdit(guia: Guia, isEditing: boolean): void {
    this.editingStates[guia.id!] = isEditing;
  }

  isEditing(guia: Guia): boolean {
    return this.editingStates[guia.id!] || false;
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadGuias(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadGuias(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadGuias(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadGuias(this.currentPage, this.pageSize);
  }
}


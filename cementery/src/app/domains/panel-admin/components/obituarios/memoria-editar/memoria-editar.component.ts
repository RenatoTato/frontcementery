import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Memoria } from '@externo/models/obituario/memoria.model';
import { Obituario } from '@externo/models/obituario/obituario.model';
import { MemoriaFilter } from '@externo/models/obituario/memoriab.model';
import { ObituarioService } from '@externo/services/obituario.service';


@Component({
  selector: 'app-memoria-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './memoria-editar.component.html',
  styleUrl: './memoria-editar.component.css'
})
export class MemoriaEditarComponent  implements OnInit {
  memorias: Memoria[] = [];
  obituarios: Obituario[] = [];
  paginatedMemorias: Memoria[] = [];
  memoriaEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'names', label: 'Nombre del Autor' },
    { name: 'relationship', label: 'Relación' },
    { name: 'obituary', label: 'Obituario' },
  ];

  tableHeaders = ['Autor', 'Relación', 'Texto', 'Obituario', 'Imagen'];
  editableFields: (keyof Memoria)[] = ['names', 'relationship', 'text', 'obituary', 'image'];

  constructor(
    private fb: FormBuilder,
    private obituarioService: ObituarioService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMemorias(this.currentPage, this.pageSize);
    this.loadObituarios();
    this.loadMemoria();
  }

  initForm(): void {
    this.memoriaEditarForm = this.fb.group({
      names: [''],
      relationship: [''],
      obituary: [''],
    });
  }

  loadObituarios(): void {
    this.obituarioService.getReadObituarios().subscribe(
      (obituarios: Obituario[]) => {
        this.obituarios = obituarios;
      },
      (error) => console.error('Error al obtener los obituarios:', error)
    );
  }
  loadMemoria(): void {
    this.obituarioService.getReadMemorias().subscribe(
      (memorias: Memoria[]) => {
        this.memorias = memorias;
      },
      (error) => console.error('Error al obtener los memorias:', error)
    );
  }

  loadMemorias(page: number, pageSize: number, filterParams?: MemoriaFilter): void {
    this.obituarioService.getMemorias(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.memorias = response.results;
          this.totalItems = response.count;
        } else {
          this.memorias = response;
          this.totalItems = this.memorias.length;
        }
        this.paginatedMemorias = this.memorias;
        this.paginatedMemorias.forEach((item) => {
          if (item.obituary && typeof item.obituary === 'number') {
            this.obituarioService.getObituarioId(item.obituary).subscribe(
              (obituario: Obituario) => {
                item.obituarioDetails = `${obituario.name}`;
              },
              (error) => {
                console.error(`Error al cargar la tumba con ID ${item.obituary}:`, error);
                item.obituarioDetails = 'Información no disponible';
              }
            );
          }
        });
      },
      (error) => console.error('Error al cargar las memorias:', error)
    );
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Lógica para procesar el archivo seleccionado (por ejemplo, subirlo o mostrarlo en una previsualización)
      console.log('Archivo seleccionado:', file);
    }
  }
  onSubmit(): void {
    const filterParams = this.memoriaEditarForm.value;
    this.loadMemorias(this.currentPage, this.pageSize, filterParams);
  }

  toggleEdit(memoria: Memoria, isEditing: boolean): void {
    this.editingStates[memoria.id!] = isEditing;
  }

  isEditing(memoria: Memoria): boolean {
    return this.editingStates[memoria.id!] || false;
  }

  saveMemoria(memoria: Memoria): void {
    if (!memoria.id) {
      console.error('El ID de la memoria es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta memoria?')) {
      this.obituarioService.updateMemoria(memoria.id, memoria, null).subscribe(
        () => {
          this.editingStates[memoria.id!] = false;
          this.loadMemorias(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la memoria:', error)
      );
    }
  }

  deleteMemoria(id?: number): void {
    if (!id) {
      console.error('El ID de la memoria es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar esta memoria?')) {
      this.obituarioService.deleteMemoria(id).subscribe(
        () => this.loadMemorias(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la memoria:', error)
      );
    }
  }

  resetFilters(): void {
    this.memoriaEditarForm.reset();
    this.loadMemorias(1, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadMemorias(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadMemorias(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadMemorias(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadMemorias(this.currentPage, this.pageSize);
  }
}
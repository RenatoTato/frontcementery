import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ObituarioService } from '@externo/services/obituario.service';
import { Obituario } from '@externo/models/obituario/obituario.model';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { ObituarioFilter } from '@externo/models/obituario/obituariob.mode';
import { DifuntoService } from '@externo/services/difunto.service';

@Component({
  selector: 'app-obituario-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './obituario-editar.component.html',
  styleUrl: './obituario-editar.component.css'
})
export class ObituarioEditarComponent  implements OnInit {
  obituarios: Obituario[] = [];
  difuntos: Difunto[] = [];
  paginatedObituarios: Obituario[] = [];
  obituarioEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'place', label: 'Lugar' },
    { name: 'cementery', label: 'Cementerio' },
    { name: 'deceased', label: 'Difunto' },
  ];

  tableHeaders = ['Lugar', 'Cementerio', 'Difunto', 'Nombre', 'Fecha', 'Detalles'];
  editableFields: (keyof Obituario)[] = ['place', 'cementery', 'deceased', 'name','date','obituary_detail'];

  constructor(
    private fb: FormBuilder,
    private obituarioService: ObituarioService,
    private difuntoService: DifuntoService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadObituarios(this.currentPage, this.pageSize);
    this.loadDifuntos();
    this.loadReadObituarios();
  }

  initForm(): void {
    this.obituarioEditarForm = this.fb.group({
      place: [''],
      cementery: [''],
      deceased: [''],
    });
  }

  loadReadObituarios(): void {
    this.obituarioService.getReadObituarios().subscribe(
      (obituarios: Obituario[]) => {
        this.obituarios = obituarios;
      },
      (error) => console.error('Error al obtener los difuntos:', error)
    );
  }
  loadDifuntos(): void {
    this.difuntoService.getReadDifuntos().subscribe(
      (difuntos: Difunto[]) => {
        this.difuntos = difuntos;
      },
      (error) => console.error('Error al obtener los artículos:', error)
    );
  }

  loadObituarios(page: number, pageSize: number, filterParams?: ObituarioFilter): void {
    this.obituarioService.getObituarios(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.obituarios = response.results;
          this.totalItems = response.count;
        } else {
          this.obituarios = response;
          this.totalItems = this.obituarios.length;
        }
        this.paginatedObituarios = this.obituarios;
        this.paginatedObituarios.forEach((item) => {
          if (item.deceased && typeof item.deceased === 'number') {
            this.difuntoService.getDifuntoId(item.deceased).subscribe(
              (difunto: Difunto) => {
                item.difuntoDetails = `${difunto.names} ${difunto.last_names}`;
              },
              (error) => {
                console.error(`Error al cargar la tumba con ID ${item.deceased}:`, error);
                item.difuntoDetails = 'Información no disponible';
              }
            );
          }
        });
      },
      (error) => console.error('Error al cargar los obituarios:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.obituarioEditarForm.value;
    this.loadObituarios(this.currentPage, this.pageSize, filterParams);
  }

  toggleEdit(obituario: Obituario, isEditing: boolean): void {
    this.editingStates[obituario.id!] = isEditing;
  }

  isEditing(obituario: Obituario): boolean {
    return this.editingStates[obituario.id!] || false;
  }

  saveObituario(obituario: Obituario): void {
    if (!obituario.id) {
      console.error('El ID del obituario es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar este obituario?')) {
      this.obituarioService.updateObituario(obituario.id, obituario).subscribe(
        () => {
          this.editingStates[obituario.id!] = false;
          this.loadObituarios(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar el obituario:', error)
      );
    }
  }

  deleteObituario(id?: number): void {
    if (!id) {
      console.error('El ID del obituario es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este obituario?')) {
      this.obituarioService.deleteObituario(id).subscribe(
        () => this.loadObituarios(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar el obituario:', error)
      );
    }
  }

  resetFilters(): void {
    this.obituarioEditarForm.reset();
    this.loadObituarios(1, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadObituarios(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadObituarios(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadObituarios(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadObituarios(this.currentPage, this.pageSize);
  }
}
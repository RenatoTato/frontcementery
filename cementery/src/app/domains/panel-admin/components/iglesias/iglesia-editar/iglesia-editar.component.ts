import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Iglesia } from '@externo/models/iglesia/iglesia.model';
import { Parroquia } from '@externo/models/iglesia/parroquia.model';
import { IglesiaFilter } from '@externo/models/iglesia/iglesiab.model';
import { IglesiaService } from '@externo/services/iglesia.service';

@Component({
  selector: 'app-iglesia-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './iglesia-editar.component.html',
  styleUrl: './iglesia-editar.component.css'
})
export class IglesiaEditarComponent  implements OnInit {
  iglesias: Iglesia[] = [];
  parroquias: Parroquia[] = [];
  paginatedIglesias: Iglesia[] = [];
  iglesiaEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'name', label: 'Nombre de la Iglesia' },
    { name: 'address', label: 'Dirección' },
    { name: 'parish', label: 'Parroquia' },
  ];

  tableHeaders = ['Nombre', 'Dirección', 'Parroquia', 'Teléfono', 'Email', 'Imagen'];
  editableFields: (keyof Iglesia)[] = ['name', 'address', 'parish', 'phone', 'email', 'image'];

  constructor(
    private fb: FormBuilder,
    private iglesiaService: IglesiaService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadIglesias(this.currentPage, this.pageSize);
    this.loadParroquias();
    this.loadReadIglesias();
  }

  initForm(): void {
    this.iglesiaEditarForm = this.fb.group({
      name: [''],
      address: [''],
      parish: [''],
    });
  }
  loadReadIglesias(): void {
    this.iglesiaService.getReadIglesias().subscribe(
      (iglesias: Iglesia[]) => {
        this.iglesias = iglesias;
      },
      (error) => console.error('Error al obtener las iglesias:', error)
    );
  }

  loadParroquias(): void {
    this.iglesiaService.getReadParroquias().subscribe(
      (parroquias: Parroquia[]) => {
        this.parroquias = parroquias;
      },
      (error) => console.error('Error al obtener las parroquias:', error)
    );
  }

  loadIglesias(page: number, pageSize: number, filterParams?: IglesiaFilter): void {
    this.iglesiaService.getIglesias(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.iglesias = response.results;
          this.totalItems = response.count;
        } else {
          this.iglesias = response;
          this.totalItems = this.iglesias.length;
          
        }
        this.paginatedIglesias = this.iglesias;
        this.paginatedIglesias.forEach((item) => {
          if (item.parish && typeof item.parish === 'number') {
            this.iglesiaService.getParroquiaId(item.parish).subscribe(
              (parroquia: Parroquia) => {
                item.parroquiaDetails = `${parroquia.name}`;
              },
              (error) => {
                console.error(`Error al cargar la tumba con ID ${item.parish}:`, error);
                item.parroquiaDetails = 'Información no disponible';
              }
            );
          }
        });
      },
      (error) => console.error('Error al cargar las iglesias:', error)
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
    const filterParams = this.iglesiaEditarForm.value;
    this.loadIglesias(this.currentPage, this.pageSize, filterParams);
  }

  toggleEdit(iglesia: Iglesia, isEditing: boolean): void {
    this.editingStates[iglesia.id!] = isEditing;
  }

  isEditing(iglesia: Iglesia): boolean {
    return this.editingStates[iglesia.id!] || false;
  }

  saveIglesia(iglesia: Iglesia): void {
    if (!iglesia.id) {
      console.error('El ID de la iglesia es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta iglesia?')) {
      this.iglesiaService.updateIglesia(iglesia.id, iglesia, null).subscribe(
        () => {
          this.editingStates[iglesia.id!] = false;
          this.loadIglesias(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la iglesia:', error)
      );
    }
  }

  deleteIglesia(id?: number): void {
    if (!id) {
      console.error('El ID de la iglesia es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar esta iglesia?')) {
      this.iglesiaService.deleteIglesia(id).subscribe(
        () => this.loadIglesias(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la iglesia:', error)
      );
    }
  }

  resetFilters(): void {
    this.iglesiaEditarForm.reset();
    this.loadIglesias(1, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadIglesias(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadIglesias(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadIglesias(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadIglesias(this.currentPage, this.pageSize);
  }
}

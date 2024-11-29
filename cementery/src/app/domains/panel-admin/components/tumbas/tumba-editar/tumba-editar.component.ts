import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { TumbaService } from '@externo/services/tumba.service';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { Lote } from '@externo/models/tumba/lote.model';
import { TumbaFilter } from '@externo/models/tumba/tumbab.model';

@Component({
  selector: 'app-tumba-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './tumba-editar.component.html',
  styleUrl: './tumba-editar.component.css'
})
export class TumbaEditarComponent implements OnInit {
  tumbas: Tumba[] = [];
  lotes: Lote[] = [];
  paginatedTumbas: Tumba[] = [];
  tumbaEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 17;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};
  showFilters:boolean=false;

  filterFields = [
    { name: 'nicheNumber', label: 'Número de Nicho' },
    { name: 'nicheType', label: 'Tipo de Nicho' },
    { name: 'available', label: 'Disponibilidad' },
    { name: 'nameLote', label: 'Bloque' },
  ];
  filterOptions = {
    nicheType: [
      { value: '', label: 'Todos las tumbas' },
      { value: 'T', label: 'Tierra' },
      { value: 'E', label: 'Extramuros' },
    ],
    available: [
      { value: '', label: 'Todos las tumbas' },
      { value: true, label: 'Disponible' },
      { value: false, label: 'Ocupado' },
    ],
  };

  tableHeaders = ['Número de Nicho', 'Tipo de Nicho', 'Disponibilidad', 'Bloque', 'Descripción'];
  editableFields: (keyof Tumba)[] = ['nicheNumber', 'nicheType', 'available', 'nameLote', 'description'];

  constructor(
    private fb: FormBuilder,
    private tumbaService: TumbaService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadTumbas(this.currentPage, this.pageSize);
    this.loadReadLotes();
    this.loadReadTumba();
  }
  isLoteObject(value: any): value is Lote {
    return value && typeof value === 'object' && 'description' in value;
  }

  initForm(): void {
    this.tumbaEditarForm = this.fb.group({
      nicheNumber: [''],
      nicheType: [''],
      available: [''],
      nameLote: ['']
    });
  }

  loadReadLotes(): void {
    this.tumbaService.getReadLotes().subscribe(
      (lotes: Lote[]) => {
        this.lotes = lotes;
      },
      (error) => console.error('Error al obtener los lotes:', error)
    );
  }
  loadReadTumba(): void {
    this.tumbaService.getReadTumbas().subscribe(
      (tumbas: Tumba[]) => {
        this.tumbas = tumbas;
      },
      (error) => console.error('Error al obtener los tumbas:', error)
    );
  }

  loadTumbas(page: number, pageSize: number, filterParams?: TumbaFilter): void {
    this.tumbaService.getTumbas(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.tumbas = response.results;
          this.totalItems = response.count;
        } else {
          this.tumbas = response;
          this.totalItems = this.tumbas.length;
        }
        this.paginatedTumbas = this.tumbas;
        this.paginatedTumbas.forEach((item) => {
          if (item.nameLote && typeof item.nameLote === 'number') {
            const lote = this.lotes.find((d) => d.id === item.nameLote);
            item.nameLote_ob = lote || null; // Asigna el objeto Deudo o null si no se encuentra
          }
        });
      },
      (error) => console.error('Error al cargar las tumbas:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.tumbaEditarForm.value;
    this.loadTumbas(this.currentPage, this.pageSize, filterParams);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  toggleEdit(tumba: Tumba, isEditing: boolean): void {
    this.editingStates[tumba.id!] = isEditing;
  }
  isEditing(tumba: Tumba): boolean {
    return this.editingStates[tumba.id!] || false;
  }

  saveTumba(tumba: Tumba): void {
    if (!tumba.id) {
      console.error('El ID de la tumba es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta tumba?')) {
      this.tumbaService.updateTumba(tumba.id, tumba).subscribe(
        (response) => {
          this.editingStates[tumba.id!] = false;
          this.loadTumbas(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la tumba:', error)
      );
    }
  }

  deleteTumba(id?: number): void {
    if (!id) {
      console.error('El ID de la tumba es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar esta tumba?')) {
      this.tumbaService.deleteTumba(id).subscribe(
        () => this.loadTumbas(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la tumba:', error)
      );
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadTumbas(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadTumbas(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadTumbas(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadTumbas(this.currentPage, this.pageSize);
  }

  resetFilters(): void {
    this.tumbaEditarForm.reset();
    this.loadTumbas(1, this.pageSize);
  }
}

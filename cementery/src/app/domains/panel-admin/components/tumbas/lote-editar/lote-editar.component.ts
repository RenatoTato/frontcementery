import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { TumbaService } from '@externo/services/tumba.service';
import { Lote } from '@externo/models/tumba/lote.model';
import { LoteFilter } from '@externo/models/tumba/loteb.model';

@Component({
  selector: 'app-lote-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './lote-editar.component.html',
  styleUrl: './lote-editar.component.css'
})
export class LoteEditarComponent  implements OnInit {
  lotes: Lote[] = [];
  paginatedLotes: Lote[] = [];
  loteEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'blockName', label: 'Nombre del Bloque' },
    { name: 'typeblock', label: 'Tipo de Bloque' },
    { name: 'numbersblock', label: 'Número del Bloque' },
    { name: 'filas', label: 'Filas' },
    { name: 'columnas', label: 'Columnas' },
    { name: 'limite', label: 'Límite' },
  ];
  filterOptions = {
    typeblock: [
      { value: '', label: 'Todos' },
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
      { value: 'D', label: 'D' },
      { value: 'F', label: 'F' },
      { value: 'H', label: 'H' },
      { value: 'G', label: 'G' },
      { value: 'J', label: 'J' },
      { value: 'L', label: 'L' },
      { value: 'M', label: 'M' },
      { value: 'N', label: 'N' },
      { value: 'S', label: 'S' },
      { value: 'T', label: 'T' }
    ],
    blockName: [
      { value: '', label: 'Todos' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' },
      { value: 10, label: '10' },
      { value: 11, label: '11' },
      { value: 12, label: '12' },
    ],
    numbersblock: [
      { value: '', label: 'Todos' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
      { value: 6, label: '6' },
      { value: 7, label: '7' },
      { value: 8, label: '8' },
      { value: 9, label: '9' }
    ],
    filas: [
      { value: '', label: 'Todos' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' }
    ],
    columnas: [
      { value: '', label: 'Todos' },
      { value: 4, label: '4' },
      { value: 7, label: '7' },
      { value: 9, label: '9' },
      { value: 11, label: '11' },
      { value: 13, label: '13' },
      { value: 14, label: '14' },
      { value: 17, label: '17' },
      { value: 20, label: '20' },
      { value: 21, label: '21' }
    ],
    limite: [
      { value: '', label: 'Todos' },
      { value: 13, label: '13' },
      { value: 16, label: '16' },
      { value: 17, label: '17' },
      { value: 20, label: '20' },
      { value: 28, label: '28' },
      { value: 36, label: '36' },
      { value: 44, label: '44' },
      { value: 56, label: '56' },
      { value: 70, label: '70' },
      { value: 105, label: '105' },
    ],
  };
  tableHeaders = ['Bloque', 'Tipo', 'Número', 'Filas', 'Columnas', 'Límite', 'Descripción'];
  editableFields: (keyof Lote)[] = ['blockName', 'typeblock', 'numbersblock', 'filas', 'columnas', 'limite', 'description'];

  constructor(
    private fb: FormBuilder,
    private loteService: TumbaService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadLotes(this.currentPage, this.pageSize);
  }

  initForm(): void {
    this.loteEditarForm = this.fb.group({
      blockName: [''],
      typeblock: [''],
      numbersblock: [''],
      filas: [''],
      columnas: [''],
      limite: [''],
    });
  }

  loadLotes(page: number, pageSize: number, filterParams?: LoteFilter): void {
    this.loteService.getLotes(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.lotes = response.results;
          this.totalItems = response.count;
        } else {
          this.lotes = response;
          this.totalItems = this.lotes.length;
        }
        this.paginatedLotes = this.lotes;
      },
      (error) => console.error('Error al cargar los lotes:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.loteEditarForm.value;
    this.loadLotes(this.currentPage, this.pageSize, filterParams);
  }

  resetFilters(): void {
    this.loteEditarForm.reset();
    this.loadLotes(1, this.pageSize);
  }

  saveLote(lote: Lote): void {
    if (!lote.id) {
      console.error('El ID del lote es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar este lote?')) {
      this.loteService.updateLote(lote.id, lote).subscribe(
        () => {
          this.editingStates[lote.id!] = false;
          this.loadLotes(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar el lote:', error)
      );
    }
  }

  deleteLote(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este lote?')) {
      this.loteService.deleteLote(id).subscribe(
        () => this.loadLotes(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar el lote:', error)
      );
    }
  }

  toggleEdit(lote: Lote, isEditing: boolean): void {
    this.editingStates[lote.id!] = isEditing;
  }

  isEditing(lote: Lote): boolean {
    return this.editingStates[lote.id!] || false;
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadLotes(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadLotes(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadLotes(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadLotes(this.currentPage, this.pageSize);
  }
}



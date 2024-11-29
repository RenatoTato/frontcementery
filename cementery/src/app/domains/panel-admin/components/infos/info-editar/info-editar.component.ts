import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { InfoService } from '@externo/services/info.service';
import { Info } from '@externo/models/info/info.model';
import { InfoFilter } from '@externo/models/info/infob.model';

@Component({
  selector: 'app-info-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './info-editar.component.html',
  styleUrl: './info-editar.component.css'
})
export class InfoEditarComponent  implements OnInit {
  infos: Info[] = [];
  paginatedInfos: Info[] = [];
  infoEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  showFilters:boolean=false;
  editingStates: { [id: number]: boolean } = {};
  selectedFile: File | null = null;

  filterFields = [
    { name: 'title', label: 'Título' },
    { name: 'category', label: 'Categoría' },
  ];

  tableHeaders = ['Título', 'Categoría', 'Características', 'Exclusiones', 'Imagen', 'Precio'];
  editableFields: (keyof Info)[] = ['title', 'category', 'features', 'exclusions', 'image', 'price'];

  constructor(
    private fb: FormBuilder,
    private infoService: InfoService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadInfos(this.currentPage, this.pageSize);
  }

  initForm(): void {
    this.infoEditarForm = this.fb.group({
      title: [''],
      category: [''],
      features: [''],
      exclusions: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  loadInfos(page: number, pageSize: number, filterParams?: InfoFilter): void {
    this.infoService.getInfos(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.infos = response.results;
          this.totalItems = response.count;
        } else {
          this.infos = response;
          this.totalItems = this.infos.length;
        }
        this.paginatedInfos = this.infos;
      },
      (error) => console.error('Error al cargar la información:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.infoEditarForm.value;
    this.loadInfos(this.currentPage, this.pageSize, filterParams);
  }

  resetFilters(): void {
    this.infoEditarForm.reset();
    this.loadInfos(1, this.pageSize);
  }

  saveInfo(info: Info): void {
    if (!info.id) {
      console.error('El ID de la información es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta información?')) {
      this.infoService.updateInfo(info.id, info, this.selectedFile).subscribe(
        () => {
          this.editingStates[info.id!] = false;
          this.loadInfos(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la información:', error)
      );
    }
  }

  deleteInfo(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta información?')) {
      this.infoService.deleteInfo(id).subscribe(
        () => this.loadInfos(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la información:', error)
      );
    }
  }

  toggleEdit(info: Info, isEditing: boolean): void {
    this.editingStates[info.id!] = isEditing;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  isEditing(info: Info): boolean {
    return this.editingStates[info.id!] || false;
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadInfos(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadInfos(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadInfos(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadInfos(this.currentPage, this.pageSize);
  }
}



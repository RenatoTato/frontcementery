import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Iglesia } from '@externo/models/iglesia/iglesia.model';
import { Social, SocialPlatform } from '@externo/models/iglesia/social.model';
import { SocialFilter } from '@externo/models/iglesia/socialb.model';
import { IglesiaService } from '@externo/services/iglesia.service';


@Component({
  selector: 'app-social-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './social-editar.component.html',
  styleUrl: './social-editar.component.css'
})
export class SocialEditarComponent  implements OnInit {
  socials: Social[] = [];
  iglesias: Iglesia[] = [];
  paginatedSocials: Social[] = [];
  socialEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  showFilters:boolean=false;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'stage_type', label: 'Plataforma Social' },
    { name: 'iglesia', label: 'Iglesia' },
  ];

  tableHeaders = ['Plataforma', 'URL', 'Iglesia'];
  editableFields: (keyof Social)[] = ['stage_type', 'url', 'iglesia'];

  socialPlatforms = Object.values(SocialPlatform); // Enum de plataformas sociales

  constructor(
    private fb: FormBuilder,
    private iglesiaService: IglesiaService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSocials(this.currentPage, this.pageSize);
    this.loadIglesias();
  }

  initForm(): void {
    this.socialEditarForm = this.fb.group({
      stage_type: [''],
      iglesia: [''],
    });
  }

  loadIglesias(): void {
    this.iglesiaService.getReadIglesias().subscribe(
      (iglesias: Iglesia[]) => {
        this.iglesias = iglesias;
      },
      (error) => console.error('Error al obtener las iglesias:', error)
    );
  }
  loadSocial(): void {
    this.iglesiaService.getReadSocials().subscribe(
      (socials: Social[]) => {
        this.socials = socials;
      },
      (error) => console.error('Error al obtener las socials:', error)
    );
  }

  loadSocials(page: number, pageSize: number, filterParams?: SocialFilter): void {
    this.iglesiaService.getSocials(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.socials = response.results;
          this.totalItems = response.count;
        } else {
          this.socials = response;
          this.totalItems = this.socials.length;
        }
        this.paginatedSocials = this.socials;
        this.paginatedSocials.forEach((item) => {
          if (item.iglesia && typeof item.iglesia === 'number') {
            this.iglesiaService.getIglesiaId(item.iglesia).subscribe(
              (iglesia: Iglesia) => {
                item.iglesiaDetails = `${iglesia.name}`;
              },
              (error) => {
                console.error(`Error al cargar la tumba con ID ${item.iglesia}:`, error);
                item.iglesiaDetails = 'Información no disponible';
              }
            );
          }
        });
      },
      (error) => console.error('Error al cargar las plataformas sociales:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.socialEditarForm.value;
    this.loadSocials(this.currentPage, this.pageSize, filterParams);
  }

  toggleEdit(social: Social, isEditing: boolean): void {
    this.editingStates[social.id!] = isEditing;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  isEditing(social: Social): boolean {
    return this.editingStates[social.id!] || false;
  }

  saveSocial(social: Social): void {
    if (!social.id) {
      console.error('El ID de la plataforma social es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta plataforma social?')) {
      this.iglesiaService.updateSocial(social.id, social).subscribe(
        () => {
          this.editingStates[social.id!] = false;
          this.loadSocials(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la plataforma social:', error)
      );
    }
  }

  deleteSocial(id?: number): void {
    if (!id) {
      console.error('El ID de la plataforma social es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar esta plataforma social?')) {
      this.iglesiaService.deleteSocial(id).subscribe(
        () => this.loadSocials(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la plataforma social:', error)
      );
    }
  }

  resetFilters(): void {
    this.socialEditarForm.reset();
    this.loadSocials(1, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadSocials(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadSocials(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadSocials(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadSocials(this.currentPage, this.pageSize);
  }
}

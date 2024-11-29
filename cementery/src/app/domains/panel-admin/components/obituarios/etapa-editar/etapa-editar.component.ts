import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ObituarioService } from '@externo/services/obituario.service';
import { EtapasObituario } from '@externo/models/obituario/etapas.model';
import { Obituario } from '@externo/models/obituario/obituario.model';
import { Servicio } from '@externo/models/servicio/servicio.model';
import { EtapaFilter } from '@externo/models/obituario/etapasb.model';
import { ServicioService } from '@externo/services/servicio.service';


@Component({
  selector: 'app-etapa-editar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './etapa-editar.component.html',
  styleUrl: './etapa-editar.component.css'
})
export class EtapaEditarComponent implements OnInit {
  etapas: EtapasObituario[] = [];
  obituarios: Obituario[] = [];
  servicios: Servicio[] = [];
  paginatedEtapas: EtapasObituario[] = [];
  etapasEditarForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  showFilters:boolean=false;
  editingStates: { [id: number]: boolean } = {};

  filterFields = [
    { name: 'stage_ceremony', label: 'Etapa de Ceremonia' },
    { name: 'place', label: 'Lugar' },
    { name: 'obituary', label: 'Obituario' },
  ];

  stageOptions = [
    { value: 'Velacion', label: 'Velación' },
    { value: 'Misa', label: 'Misa' },
    { value: 'Recepcion', label: 'Recepción' },
    { value: 'Entrega_cenizas', label: 'Entrega de Cenizas' },
    { value: 'Lectura_recuerdos', label: 'Lectura de Recuerdos' },
    { value: 'Celebracion_vida', label: 'Celebración de Vida' },
  ];

  tableHeaders = ['Etapa de Ceremonia', 'Lugar','Fecha', 'Obituario', 'Ceremonia'];
  editableFields: (keyof EtapasObituario)[] = ['stage_ceremony', 'place','date', 'obituary', 'ceremony'];

  constructor(
    private fb: FormBuilder,
    private obituarioService: ObituarioService,
    private servicioService: ServicioService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEtapas(this.currentPage, this.pageSize);
    this.loadObituarios();
    this.loadServicios();
  }

  initForm(): void {
    this.etapasEditarForm = this.fb.group({
      stage_ceremony: [''],
      place: [''],
      obituary: [''],
      ceremony: [''],
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

  loadServicios(): void {
    this.servicioService.getReadServicios().subscribe(
      (servicios: Servicio[]) => {
        this.servicios = servicios;
      },
      (error) => console.error('Error al obtener los servicios:', error)
    );
  }

  loadEtapas(page: number, pageSize: number, filterParams?: EtapaFilter): void {
    this.obituarioService.getEtapas(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.etapas = response.results;
          this.totalItems = response.count;
        } else {
          this.etapas = response;
          this.totalItems = this.etapas.length;
        }
        this.paginatedEtapas = this.etapas;
        this.paginatedEtapas.forEach((item) => {
          if (item.obituary && typeof item.obituary === 'number') {
            this.obituarioService.getObituarioId(item.obituary).subscribe(
              (obituary: Obituario) => {
                item.obituaryDetails = obituary.name;
              },
              (error) => {
                console.error(`Error al cargar la tumba con ID ${item.obituary}:`, error);
                item.obituaryDetails = 'Información no disponible';
              }
            );
          }
        });
      },
      (error) => console.error('Error al cargar las etapas:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.etapasEditarForm.value;
    this.loadEtapas(this.currentPage, this.pageSize, filterParams);
  }

  toggleEdit(etapa: EtapasObituario, isEditing: boolean): void {
    this.editingStates[etapa.id!] = isEditing;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  isEditing(etapa: EtapasObituario): boolean {
    return this.editingStates[etapa.id!] || false;
  }

  saveEtapa(etapa: EtapasObituario): void {
    if (!etapa.id) {
      console.error('El ID de la etapa es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar esta etapa?')) {
      this.obituarioService.updateEtapa(etapa.id, etapa).subscribe(
        () => {
          this.editingStates[etapa.id!] = false;
          this.loadEtapas(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar la etapa:', error)
      );
    }
  }

  deleteEtapa(id?: number): void {
    if (!id) {
      console.error('El ID de la etapa es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar esta etapa?')) {
      this.obituarioService.deleteEtapa(id).subscribe(
        () => this.loadEtapas(this.currentPage, this.pageSize),
        (error) => console.error('Error al eliminar la etapa:', error)
      );
    }
  }

  resetFilters(): void {
    this.etapasEditarForm.reset();
    this.loadEtapas(1, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadEtapas(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadEtapas(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadEtapas(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadEtapas(this.currentPage, this.pageSize);
  }
}
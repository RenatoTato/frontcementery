import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioService } from '@externo/services/servicio.service';
import { Servicio } from '@externo/models/servicio/servicio.model';
import { ServicioFilter } from '@externo/models/servicio/serviciob.model';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { TumbaService } from '@externo/services/tumba.service';
import { DifuntoService } from '@externo/services/difunto.service';

@Component({
  selector: 'app-servicio-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './servicio-editar.component.html',
  styleUrl: './servicio-editar.component.css'
})
export class ServicioEditarComponent implements OnInit {
  tumbas: Tumba[] = [];
  difuntos: Difunto[] = [];
  servicios: Servicio[] = [];
  paginatedServicios: Servicio[] = [];
  servicioEditarForm!: FormGroup;
  isDarkMode: boolean = false;
  currentPage: number = 1;
  pageSize: number = 17;
  totalItems: number = 0;
  editingStates: { [id: number]: boolean } = {};
  showFilters:boolean=false;


  filterFields = [
    { name: 'startDate', label: 'Fecha de Inicio' },
    { name: 'endDate', label: 'Fecha de Fin' },
    { name: 'ceremony', label: 'Ceremonia' },
    { name: 'numberTomb', label: 'Tumba' },
    { name: 'deceased', label: 'Difunto' },
  ];

  tableHeaders = ['Fecha Inicio', 'Fecha Fin', 'Ceremonia', 'Tumba', 'Difunto', 'Estado de Pago'];
  editableFields: (keyof Servicio)[] = ['startDate', 'endDate', 'ceremony', 'numberTomb', 'deceased', 'is_paid'];

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private tumbaService: TumbaService,
    private difuntoService: DifuntoService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadServicios(this.currentPage, this.pageSize);
    this.loadTumbas();
    this.loadReadServicio();
    this.loadDifuntos();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.servicioEditarForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: [''],
      ceremony: [''],
      numberTomb: [''],
      deceased: ['']
    });
  }

  loadTumbas(): void {
    this.tumbaService.getReadTumbas().subscribe(
      (tumbas: Tumba[]) => {
        this.tumbas = tumbas;
      },
      (error) => console.error('Error al obtener las tumbas:', error)
    );
  }

  loadDifuntos(): void {
    this.difuntoService.getReadDifuntos().subscribe(
      (difuntos: Difunto[]) => {
        this.difuntos = difuntos;
      },
      (error) => console.error('Error al obtener los difuntos:', error)
    );
  }
  loadReadServicio(): void {
    this.servicioService.getReadServicios().subscribe(
      (servicios: Servicio[]) => {
        this.servicios = servicios;
        console.log('difunto:', this.servicios);
      },
      (error) => console.error('Error al obtener las difuntos:', error)
    );
  }
  loadServicios(page: number, pageSize: number, filterParams?: ServicioFilter): void {
    this.servicioService.getServicios(page, pageSize, filterParams).subscribe(
      (response) => {
        if ('results' in response) {
          this.servicios = response.results;
          this.totalItems = response.count;
        } else {
          this.servicios = response;
          this.totalItems = this.servicios.length;
        }
        this.paginatedServicios = this.servicios;
        this.paginatedServicios.forEach((item) => {
          console.log('Deudo antes de procesar:', item.deceased);
          if (item.deceased && typeof item.deceased === 'number') {
            this.difuntoService.getDifuntoId(item.deceased).subscribe(
              (difunto: Difunto) => {
                item.difuntoDetails = `${difunto.names} ${difunto.last_names}`;
              },
              (error) => {
                console.error(`Error al cargar el difunto con ID ${item.deceased}:`, error);
                item.difuntoDetails = 'Información no disponible';
              }
            );
          }
          if (item.numberTomb && typeof item.numberTomb === 'number') {
            this.tumbaService.getTumbaId(item.numberTomb).subscribe(
              (tumba: Tumba) => {
                item.tumbaDetails = tumba.description;
              },
              (error) => {
                console.error(`Error al cargar la tumba con ID ${item.numberTomb}:`, error);
                item.tumbaDetails = 'Información no disponible';
              }
            );
          }
        });
      },
      (error) => console.error('Error al cargar los difuntos:', error)
    );
  }

  onSubmit(): void {
    const filterParams = this.servicioEditarForm.value;
    this.loadServicios(this.currentPage, this.pageSize, filterParams);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  toggleEdit(servicio: Servicio, isEditing: boolean): void {
    this.editingStates[servicio.id!] = isEditing;
  }

  saveServicio(servicio: Servicio): void {
    if (!servicio.id) {
      console.error('El ID del servicio es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar este servicio?')) {
      this.servicioService.updateServicio(servicio.id, servicio).subscribe(
        (response) => {
          this.editingStates[servicio.id!] = false;
          console.log('Servicio actualizado correctamente:', response);
          this.loadServicios(this.currentPage, this.pageSize);
          this.cdRef.detectChanges();
        },
        (error) => console.error('Error al actualizar el servicio:', error)
      );
    }
  }

  deleteServicio(id?: number): void {
    if (!id) {
      console.error('El ID del servicio no es válido.');
      return;
    }
  
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.servicioService.deleteServicio(id).subscribe(
        () => {
          console.log('Servicio eliminado correctamente.');
          this.loadServicios(this.currentPage, this.pageSize); // Recargar los servicios después de eliminar
        },
        (error) => console.error('Error al eliminar el servicio:', error)
      );
    }
  }

  isEditing(servicio: Servicio): boolean {
    return this.editingStates[servicio.id!] || false;
  }

  nextPage(step: number): void {
    const newPage = this.currentPage + step;
    if (newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadServicios(this.currentPage, this.pageSize);
    }
  }

  previousPage(step: number): void {
    const newPage = this.currentPage - step;
    if (newPage >= 1) {
      this.currentPage = newPage;
      this.loadServicios(this.currentPage, this.pageSize);
    }
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.loadServicios(this.currentPage, this.pageSize);
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.loadServicios(this.currentPage, this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  resetFilters(): void {
    this.servicioEditarForm.reset();
    this.loadServicios(1, this.pageSize);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  loadDarkModePreference(): void {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}
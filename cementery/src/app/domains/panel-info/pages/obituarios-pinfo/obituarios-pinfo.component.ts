import { Component, OnInit } from '@angular/core';
import { ObituarioService } from '@externo/services/obituario.service';
import { Obituario } from '@externo/models/obituario/obituario.model';
import { ObituarioFilter } from '@externo/models/obituario/obituariob.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObituarioInfosComponent } from "../../component/obituario-infos/obituario-infos.component";
import { EtapasObituario } from '@externo/models/obituario/etapas.model';
import { Memoria } from '@externo/models/obituario/memoria.model';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { ArticuloService } from '@externo/services/articulo.service';
import { ArticuloInfoComponent } from '@info/component/articulo-info/articulo-info.component';

@Component({
  selector: 'app-obituarios-pinfo',
  standalone: true,
  imports: [CommonModule, FormsModule, ArticuloInfoComponent],
  templateUrl: './obituarios-pinfo.component.html',
  styleUrl: './obituarios-pinfo.component.css'
})
export class ObituariosPinfoComponent implements OnInit {
  selectedFile: File | null = null; // Archivo seleccionado
  obituarios: Obituario[] = [];
  selectedObituario: Obituario | null = null; // Obituario seleccionado
  etapas: EtapasObituario[] = [];
  articulos: Articulo[] = [];
  comentarioActivo: boolean[] = [];
  stageCeremonyMap: { [key: string]: string } = {
    Velacion: 'Velación',
    Misa: 'Misa',
    Recepcion: 'Recepción',
    Entrega_cenizas: 'Entrega de las Cenizas',
    Lectura_recuerdos: 'Lectura de Recuerdos',
    Celebracion_vida: 'Celebración de Vida'
  };
  memorias: Memoria[] = [];
  showMemoryForm: boolean = false;
  nuevaMemoria: { names: string; text: string; relationship: string } = {
    names: '',
    text: '',
    relationship: ''
  };

  filter: ObituarioFilter = {
    place: undefined,
    name: undefined,
    cementery: undefined,
    deceased: undefined,
    start_date: undefined,
    end_date: undefined,
    sborn_date: undefined,
    eborn_date: undefined,
    search: undefined,
  };
  page = 1;
  pageSize = 10;
  totalObituarios = 0;


  constructor(
    private obituarioService: ObituarioService,
    private articuloService: ArticuloService,
    private router: Router,
    private route: ActivatedRoute
  ) { this.comentarioActivo = this.memorias.map(() => false);}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadObituarioDetail(+id);
        this.loadArticulos();
      } else {
        this.loadObituarios();
      }
    });
  }


  loadObituarios(): void {
    this.obituarioService
      .getObituarios(this.page, this.pageSize, this.filter)
      .subscribe((data) => {
        if ('results' in data && 'count' in data) {
          // Caso cuando la API devuelve un objeto con 'results' y 'count'
          this.obituarios = data.results;
          this.totalObituarios = data.count;
        } else if (Array.isArray(data)) {
          // Caso cuando la API devuelve un array directo
          this.obituarios = data;
          this.totalObituarios = data.length; // Si necesitas el total de resultados
        } else {
          console.error('Formato de respuesta inesperado:', data);
        }
      });
  }

  private loadObituarioDetail(id: number): void {
    this.obituarioService.getObituarioId(id).subscribe((obituario) => {
      this.selectedObituario = obituario;
      this.loadEtapas(id);
      this.loadMemorias(id);
    });
  }
  private loadArticulos() {
    this.articuloService.getReadArticulos({ is_featured: true }).subscribe((data) => {
      this.articulos = data;
    });
  }

  applyFilter(): void {
    this.page = 1; // Reinicia la paginación
    this.loadObituarios();
  }
  viewDetail(obituario: Obituario): void {
    this.selectedObituario = obituario;
    const id = obituario.id; // id ya no será undefined si Obituario tiene id siempre
    if (id !== undefined) {
      this.loadEtapas(id);
      this.loadMemorias(id);
    }
  }
  private loadEtapas(obituaryId: number): void {
    this.obituarioService.getReadEtapas({ obituary: obituaryId }).subscribe((etapas) => {
      this.etapas = etapas;
    });
  }

  private loadMemorias(obituaryId: number): void {
    this.obituarioService.getReadMemorias({ obituary: obituaryId }).subscribe((memorias) => {
      this.memorias = memorias;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }
  navigateToDetail(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID is undefined');
      return;
    }
    this.router.navigate(['/obituarios', id]);
  }

  navigateToList(): void {
    this.router.navigate(['/obituarios']);
  }

  backToList(): void {
    this.selectedObituario = null; // Regresa a la lista
    this.etapas = [];
    this.memorias = [];
  }
  toggleMemoryForm(): void {
    this.showMemoryForm = !this.showMemoryForm;
  }

  agregarMemoria(): void {
    if (!this.selectedObituario?.id) return;

    const nuevaMemoriaData: Memoria = {
      ...this.nuevaMemoria,
      obituary: this.selectedObituario.id,
      description: 'Memoria agregada desde el frontend',
    };

    // Llama al servicio para enviar la memoria con la imagen opcional
    this.obituarioService.createMemoria(nuevaMemoriaData, this.selectedFile).subscribe(() => {
      if (this.selectedObituario?.id) {
        this.loadMemorias(this.selectedObituario.id);
      }
      this.toggleMemoryForm();
      this.nuevaMemoria = { names: '', text: '', relationship: '' }; // Limpia el formulario
      this.selectedFile = null; // Limpia el archivo seleccionado
    });
  }
  handleKeyPress(event: KeyboardEvent, obituario: any): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.viewDetail(obituario); // Llama a la función del clic
      event.preventDefault(); // Evita comportamientos como el desplazamiento
    }
  }
  clearFilters(): void {
    this.filter = {
      place: undefined,
      name: undefined,
      cementery: undefined,
      deceased: undefined,
      start_date: undefined,
      end_date: undefined,
      sborn_date: undefined,
      eborn_date: undefined,
      search: undefined,
    };
    this.page = 1; // Reinicia la paginación
    this.loadObituarios();
  }


  setDateRange(range: string): void {
    const now = new Date();
    if (range === '365') {
      this.filter.start_date = new Date(now.setDate(now.getDate() - 365)).toISOString();
      this.filter.end_date = new Date().toISOString();
    } else if (range === '1825') {
      this.filter.start_date = new Date(now.setDate(now.getDate() - 1825)).toISOString();
      this.filter.end_date = new Date().toISOString();
    } else if (range === '3650') {
      this.filter.start_date = new Date(now.setDate(now.getDate() - 3650)).toISOString();
      this.filter.end_date = new Date().toISOString();
    } else {
      this.filter.start_date = undefined;
      this.filter.end_date = undefined;
    }
    this.applyFilter();
  }

  setDecadeRange(decade: number | null): void {
    if (decade === null) {
      this.filter.sborn_date = undefined;
      this.filter.eborn_date = undefined;
    } else {
      this.filter.sborn_date = new Date(`${decade}-01-01T00:00:00Z`).toISOString();
      this.filter.eborn_date = new Date(`${decade + 9}-12-31T23:59:59Z`).toISOString();
    }
    this.applyFilter();
  }
  setPlace(event: Event): void {
    const input = event.target as HTMLInputElement; // Conversión de tipo aquí
    this.filter.place = input?.value || ''; // Asigna el valor al filtro
    this.applyFilter();
  }

  formatName(name: string | undefined): string {
    if (!name) return 'Nombre no disponible';
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  setCemetery(event: Event): void {
    const input = event.target as HTMLInputElement; // Conversión de tipo aquí
    this.filter.cementery = input?.value || ''; // Asigna el valor al filtro
    this.applyFilter();
  }

  setSearch(event: Event): void {
    const input = event.target as HTMLInputElement; // Conversión de tipo aquí
    this.filter.name = input?.value || ''; // Asigna el valor al filtro
    this.applyFilter();
  }
  verArticulo(id: number): void {
    this.router.navigate(['/articulos', id]); // Navega a la ruta con el ID
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadObituarios();
  }
  volverALaLista(): void {
    this.router.navigate(['/articulos']); // Redirige a la vista principal de artículos
  }
  copiarLink(): void {
    const link = window.location.href; // Obtiene el link actual
    navigator.clipboard.writeText(link).then(() => {
      alert('Enlace copiado al portapapeles');
    });
  }
  guardarComentario(id: number | undefined, description: string, index: number) {
    const obituarioId = id ?? 0; // Valor predeterminado para id
    this.obituarioService.updateDescription(obituarioId, description).subscribe({
      next: (response) => {
        console.log('Descripción actualizada:', response);
  
        // Cambiar el estado de comentarioActivo a false cuando sea exitoso
        this.comentarioActivo[index] = false;
      },
      error: (err) => {
        console.error('Error al actualizar la descripción:', err);
      },
    });
  }
  toggleComentario(index: number) {
    this.comentarioActivo[index] = !this.comentarioActivo[index];
  }
}
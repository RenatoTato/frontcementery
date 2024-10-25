import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DifuntoService } from '@externo/services/difunto.service';
import { TumbaService } from '@externo/services/tumba.service';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-difunto-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './difunto-editar.component.html',
  styleUrls: ['./difunto-editar.component.css']
})
export class DifuntoEditarComponent implements OnInit {
  
  difuntos: Difunto[] = [];
  paginatedDifuntos: Difunto[] = [];
  tumbas: Tumba[] = [];
  deudos: Deudo[] = [];
  difuntoEditarForm!: FormGroup;
  isDarkMode: boolean = false;
  
  currentPage: number = 1;
  pageSize: number = 17;
  totalPages: number = 0;
  constructor(private fb: FormBuilder, 
    private difuntoService: DifuntoService,
    private tumbasService: TumbaService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadDifuntos();
    this.loadTumbas();
    this.loadDeudos();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.difuntoEditarForm = this.fb.group({
      names: ['', Validators.required],
      last_names: ['', Validators.required],
      idNumber: ['', Validators.required],
      requestNumber: ['', Validators.required]  // Incluye este campo
    });
  }

  loadDifuntos(filterParams?: any): void {
    this.difuntoService.getDifuntos(filterParams).subscribe(
      (response: Difunto[]) => {
        this.difuntos = response;
        this.totalPages = Math.max(1, Math.ceil(this.difuntos.length / this.pageSize)); // Calcular el número total de páginas
      this.updatePaginatedDifuntos(); // Actualizar la lista paginada
      },
      (error) => {
        console.error('Error al cargar los difuntos:', error);
      }
    );
  }
  // Cargar las tumbas disponibles
  loadTumbas(): void {
    this.tumbasService.getTumbas().subscribe(
      (response: Tumba[]) => {
        this.tumbas = response;
      },
      (error) => {
        console.error('Error al cargar las tumbas:', error);
      }
    );
  }

  // Cargar los deudos disponibles
  loadDeudos(): void {
    this.difuntoService.getDeudos().subscribe(
      (response: Deudo[]) => {
        this.deudos = response;
      },
      (error) => {
        console.error('Error al cargar los deudos:', error);
      }
    );
  }
  onSubmit(): void {
    const filters = this.difuntoEditarForm.value;
    this.loadDifuntos(filters);
  }
   // Actualizar la lista paginada
   updatePaginatedDifuntos(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDifuntos = this.difuntos.slice(startIndex, endIndex);
  }

  // Cambiar a la página anterior
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedDifuntos();
    }
  }

  // Cambiar a la página siguiente
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedDifuntos();
    }
  }
  resetFilters(): void {
    this.difuntoEditarForm.reset();
    this.loadDifuntos();
  }

  toggleEdit(difunto: Difunto, isEditing: boolean): void {
    difunto.isEditing = isEditing;
  }
  
  // Guarda los cambios realizados
  saveDifunto(difunto: Difunto): void {
    this.difuntoService.updateDifunto(difunto.id, difunto).subscribe(
      (response) => {
        console.log('Difunto actualizado:', response);
        difunto.isEditing = false; // Desactiva el modo de edición después de guardar
      },
      (error) => {
        console.error('Error al actualizar el difunto:', error);
      }
    );
  }
  
  updateDifunto(): void {
    if (this.difuntoEditarForm.valid) {
      const updatedDifunto: Difunto = this.difuntoEditarForm.value;
      const difuntoId = updatedDifunto.id;
  
      this.difuntoService.updateDifunto(difuntoId, updatedDifunto).subscribe(
        (response) => {
          console.log('Difunto actualizado:', response);
          this.loadDifuntos();
        },
        (error) => {
          console.error('Error al actualizar el difunto:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }

  deleteDifunto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este difunto?')) {
      this.difuntoService.deleteDifunto(id).subscribe(
        () => {
          console.log('Difunto eliminado');
          this.loadDifuntos();
        },
        (error) => {
          console.error('Error al eliminar el difunto:', error);
        }
      );
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.documentElement;

    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

  loadDarkModePreference(): void {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { Obituario } from '@externo/models/obituario/obituario.model';
import { DifuntoService } from '@externo/services/difunto.service';
import { ObituarioService } from '@externo/services/obituario.service';

@Component({
  selector: 'app-obituarioForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './obituarioForm.component.html',
  styleUrl: './obituarioForm.component.css'
})
export class ObituarioFormComponent {
  obituarioForm!: FormGroup;
  difuntos: Difunto[] = [];  // Lista de difuntos para seleccionar
  isDarkMode: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private obituarioService: ObituarioService, 
    private difuntoService: DifuntoService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadDifuntos();  // Cargar los difuntos disponibles
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.obituarioForm = this.fb.group({
      obituary_detail: ['', Validators.required],  // Detalle del obituario es requerido
      cementery: [''],  // Cementerio opcional
      place: [''],  // Lugar opcional
      date: [null],  // Fecha opcional
      deceased: [null, Validators.required]  // Difunto es requerido
    });
  }

  onSubmit(): void {
    if (this.obituarioForm.valid) {
      const newObituario: Obituario = this.obituarioForm.value;
      console.log('Datos a enviar:', newObituario);

      this.obituarioService.createObituario(newObituario).subscribe(
        (response) => {
          console.log('Obituario creado:', response);
        },
        (error) => {
          console.error('Error al crear el obituario:', error);
        }
      );
    }
  }

  loadDifuntos(): void {
    this.difuntoService.getDifuntos().subscribe(
      (response: Difunto[]) => {
        this.difuntos = response;
      },
      (error) => {
        console.error('Error al cargar los difuntos:', error);
      }
    );
  }

  resetForm(): void {
    this.obituarioForm.reset();
  }

  cancelar(): void {
    this.resetForm();
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

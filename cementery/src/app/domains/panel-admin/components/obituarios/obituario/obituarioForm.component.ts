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
    this.updateNameOnDeceasedChange();
    this.loadDarkModePreference();
    
  }

  initForm(): void {
    this.obituarioForm = this.fb.group({
      obituary_detail: ['', Validators.required],  // Detalle del obituario es requerido
      cementery: [''],  // Cementerio opcional
      place: [''],  // Lugar opcional
      date: [null],  // Fecha opcional
      deceased: [null, Validators.required],  // Difunto es requerido
      name: [''],
    });
  }

  onSubmit(): void {
    if (this.obituarioForm.valid) {
      // Convertir 'deceased' a número antes de enviar
      const obituarioData = { ...this.obituarioForm.value, deceased: +this.obituarioForm.value.deceased };
      
      console.log('Datos a enviar:', obituarioData);
      this.obituarioService.createObituario(obituarioData).subscribe(
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
      (response) => {
        // Manejo de la respuesta aquí
      },
      (error: any) => {
        console.error('Error al cargar los difuntos:', error);
      }
    );
  }
  updateNameOnDeceasedChange(): void {
    this.obituarioForm.get('deceased')?.valueChanges.subscribe(deceasedId => {
      console.log('Difunto seleccionado ID:', deceasedId);  // Verifica qué difunto ha sido seleccionado
      const selectedDifunto = this.difuntos.find(d => d.id === +deceasedId);
      
      if (selectedDifunto) {
        const fullName = `${selectedDifunto.names} ${selectedDifunto.last_names}`;
        console.log('Nombre completo del difunto:', fullName);  // Verifica si se está obteniendo el nombre
        this.obituarioForm.patchValue({ name: fullName });
      } else {
        console.log('No se encontró el difunto con el ID:', deceasedId);
        this.obituarioForm.patchValue({ name: '' });
      }
    });
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

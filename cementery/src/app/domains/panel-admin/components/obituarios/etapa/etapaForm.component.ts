import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Obituario } from '@externo/models/obituario/obituario.model';
import { Servicio } from '@externo/models/servicio/servicio.model';
import { EtapasObituario } from '@externo/models/obituario/etapas.model';
import { ObituarioService } from '@externo/services/obituario.service';
import { ServicioService } from '@externo/services/servicio.service';


@Component({
  selector: 'app-etapaForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './etapaForm.component.html',
  styleUrl: './etapaForm.component.css'
})
export class EtapaFormComponent {
  etapasObituarioForm!: FormGroup;
  obituarios: Obituario[] = [];  // Lista de obituarios para seleccionar
  servicios: Servicio[] = [];  // Lista de servicios para seleccionar
  isDarkMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private etapasObituarioService: ObituarioService,
    private servicioService: ServicioService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadObituarios();  // Cargar los obituarios disponibles
    this.loadServicios();  // Cargar los servicios disponibles
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.etapasObituarioForm = this.fb.group({
      stage_type: ['', Validators.required],  // Etapa es requerida
      place: [''],  // Lugar opcional
      date: [null],  // Fecha opcional
      obituary: [null, Validators.required],  // Obituario es requerido
      ceremony: [null, Validators.required]  // Ceremonia es requerida
    });
  }

  onSubmit(): void {
    if (this.etapasObituarioForm.valid) {
      const newEtapasObituario: EtapasObituario = this.etapasObituarioForm.value;
      console.log('Datos a enviar:', newEtapasObituario);

      this.etapasObituarioService.createEtapa(newEtapasObituario).subscribe(
        (response) => {
          console.log('Etapa del obituario creada:', response);
        },
        (error) => {
          console.error('Error al crear la etapa del obituario:', error);
        }
      );
    }
  }

  loadObituarios(): void {
    this.etapasObituarioService.getObituarios().subscribe(
      (response) => {
        this.obituarios = response as Obituario[];
      },
      (error: any) => {
        console.error('Error al cargar los obituarios:', error);
      }
    );
  }

  loadServicios(): void {
    this.servicioService.getServicios().subscribe(
      (response) => {
        this.servicios = response as Servicio[];
      },
      (error: any) => {
        console.error('Error al cargar los servicios:', error);
      }
    );
  }

  resetForm(): void {
    this.etapasObituarioForm.reset();
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
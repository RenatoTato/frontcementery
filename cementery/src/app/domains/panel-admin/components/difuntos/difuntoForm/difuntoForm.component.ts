import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DifuntoService } from '@externo/services/difunto.service'; 
import { TumbaService } from '@externo/services/tumba.service';
import { Difunto } from '@externo/models/difunto/difunto.model'; 
import { Deudo } from '@externo/models/difunto/deudo.model';
import { CommonModule } from '@angular/common';
import { Tumba } from '@externo/models/tumba/tumba.model';

@Component({
  selector: 'app-difuntoForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './difuntoForm.component.html',
  styleUrl: './difuntoForm.component.css'
})
export class DifuntoFormComponent {
  difuntoForm!: FormGroup;
  deudos: Deudo[] = [];
  tumbas: Tumba[] = [];
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private difuntoService: DifuntoService, private tumbaService: TumbaService) { }

  ngOnInit() {
    this.initForm();
    this.loadTumbas();
    this.loadDeudos();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.difuntoForm = this.fb.group({
      names: ['', Validators.required],
      last_names: ['', Validators.required],
      idNumber: ['', Validators.required],
      requestNumber: ['', Validators.required],
      tumba: ['', Validators.required],
      deudo: ['', Validators.required],
      observaciones: [''],
    });
  }

  onSubmit(): void {
    if (this.difuntoForm.valid) {
      const newDifunto: Difunto = this.difuntoForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newDifunto);
  
      this.difuntoService.createDifunto(newDifunto).subscribe(
        (response) => {
          console.log('Artículo creado:', response);
        },
        (error) => {
          console.error('Error al crear el artículo:', error);
          if (error.error) {
            console.error('Detalles del error:', error.error);  // Aquí obtendrás más detalles del backend
          }
        }
      );
    }
  }
  loadTumbas(): void {
    this.tumbaService.getTumbas().subscribe(
      (response: Tumba[]) => {
        this.tumbas = response;
      },
      (error) => {
        console.error('Error al cargar las tumbas:', error);
      }
    );
  }
  
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
  resetForm(): void {
    this.difuntoForm.reset()
  }
  cancelar(): void {
    this.resetForm();
  }
  // Método para alternar el modo oscuro y guardar la preferencia en el localStorage
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.documentElement;

    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');  // Guardar preferencia
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');  // Guardar preferencia
    }
  }
  // Cargar la preferencia de modo oscuro del localStorage
  loadDarkModePreference(): void {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }
}

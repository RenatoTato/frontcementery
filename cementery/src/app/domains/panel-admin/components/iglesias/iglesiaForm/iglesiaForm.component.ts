import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IglesiaService } from '@externo/services/iglesia.service';
import { Iglesia } from '@externo/models/iglesia/iglesia.model';
import { CommonModule } from '@angular/common';
import { Parroquia } from '@externo/models/iglesia/parroquia.model';

@Component({
  selector: 'app-iglesiaForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './iglesiaForm.component.html',
  styleUrl: './iglesiaForm.component.css'
})
export class IglesiaFormComponent {
  iglesiaForm!: FormGroup;
  parroquias: Parroquia[] = []; 
  selectedFile: File | null = null;  // Para almacenar el archivo de imagen seleccionado
  isDarkMode: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private iglesiaService: IglesiaService,
    private parroquiaService: IglesiaService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
    this.loadParroquias();
  }

  initForm(): void {
    this.iglesiaForm = this.fb.group({
      name: ['', Validators.required],
      address: [''],
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]],
      phone: [''],
      email: ['', Validators.email],
      schedule: [''],
      priest: [''],
      sector: [''],
      parish: ['', Validators.required],  // Parroquia requerida
      image: [''],  // Campo de la imagen se manejará por separado
    });
  }

  onSubmit(): void {
    if (this.iglesiaForm.valid) {
      const iglesiaData: Iglesia = this.iglesiaForm.value;

      // Llamar al servicio para crear la iglesia, pasando los datos y el archivo seleccionado
      this.iglesiaService.createIglesia(iglesiaData, this.selectedFile).subscribe(
        (response) => {
          console.log('Iglesia creada:', response);
        },
        (error) => {
          console.error('Error al crear la iglesia:', error);
        }
      );
    }
  }
  loadParroquias(): void {
    this.parroquiaService.getParroquias().subscribe(
      (response) => {
        this.parroquias = response as Parroquia[];
      },
      (error: any) => {
        console.error('Error al cargar las parroquias:', error);
      }
    );
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];  // Almacenar el archivo seleccionado
    }
  }
  resetForm(): void {
    this.iglesiaForm.reset()
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




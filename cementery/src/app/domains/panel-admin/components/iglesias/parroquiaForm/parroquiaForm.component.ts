import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Parroquia } from '@externo/models/iglesia/parroquia.model';
import { IglesiaService } from '@externo/services/iglesia.service';

@Component({
  selector: 'app-parroquiaForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './parroquiaForm.component.html',
  styleUrl: './parroquiaForm.component.css'
})
export class ParroquiaFormComponent {
  parroquiaForm!: FormGroup;
  selectedFile: File | null = null;
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private parroquiaService: IglesiaService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.parroquiaForm = this.fb.group({
      name: ['', Validators.required],
      churches_number: ['', [Validators.required, Validators.min(1)]],
      image: [''],  // URL opcional de la imagen
    });
  }

  onSubmit(): void {
    if (this.parroquiaForm.valid) {
      const parroquiaData: Parroquia= this.parroquiaForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', parroquiaData);
  
      this.parroquiaService.createParroquia(parroquiaData, this.selectedFile).subscribe(
        (response) => {
          console.log('Parroquia creado:', response);
        },
        (error) => {
          console.error('Error al crear el Parroquia:', error);
          if (error.error) {
            console.error('Detalles del error:', error.error);  // Aquí obtendrás más detalles del backend
          }
        }
      );
    }
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];  // Almacenar el archivo seleccionado
    }
  }
  resetForm(): void {
    this.parroquiaForm.reset()
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




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
      const newParroquia: Parroquia= this.parroquiaForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newParroquia);
  
      this.parroquiaService.createParroquia(newParroquia).subscribe(
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




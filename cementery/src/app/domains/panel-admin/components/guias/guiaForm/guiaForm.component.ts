import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Guia } from '@externo/models/guia/guia.model';
import { GuiaService } from '@externo/services/guia.service';
@Component({
  selector: 'app-guiaForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './guiaForm.component.html',
  styleUrl: './guiaForm.component.css'
})
export class GuiaFormComponent {
  guiaForm!: FormGroup;
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private guiaService: GuiaService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.guiaForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description_short: [''],
      steps: [''],
      aditional_resources: [''],
    });
  }

  onSubmit(): void {
    if (this.guiaForm.valid) {
      const newGuia: Guia= this.guiaForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newGuia);
  
      this.guiaService.createGuia(newGuia).subscribe(
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
    this.guiaForm.reset()
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



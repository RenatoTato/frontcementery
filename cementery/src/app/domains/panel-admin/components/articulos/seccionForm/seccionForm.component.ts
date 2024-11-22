import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloService } from '@externo/services/articulo.service';
import { Seccion } from '@externo/models/articulo/seccion.model';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seccionForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './seccionForm.component.html',
  styleUrl: './seccionForm.component.css'
})
export class SeccionFormComponent {
  seccionArticuloForm!: FormGroup;
  articulos: Articulo[] = [];
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private seccionService: ArticuloService) { }

  ngOnInit() {
    this.initForm();
    this.loadArticulos();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.seccionArticuloForm = this.fb.group({
      subtitle: ['', Validators.required],
      content: ['', Validators.required],
      description: [''],
      article: ['', Validators.required]  // Relación con el artículo
    });
  }

  onSubmit(): void {
    if (this.seccionArticuloForm.valid) {
      const newSeccion: Seccion = this.seccionArticuloForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newSeccion);
  
      this.seccionService.createSeccion(newSeccion).subscribe(
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
  loadArticulos(): void {
    this.seccionService.getReadArticulos().subscribe(
      (response) => {
        this.articulos = response as Articulo[];
      },
      (error) => {
        console.error('Error al cargar los artículos:', error);
      }
    );
  }
  resetForm(): void {
    this.seccionArticuloForm.reset()
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



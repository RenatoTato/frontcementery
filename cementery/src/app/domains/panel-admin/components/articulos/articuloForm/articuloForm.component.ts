import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloService } from '@externo/services/articulo.service';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articuloForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './articuloForm.component.html',
  styleUrl: './articuloForm.component.css'
})
export class ArticuloFormComponent {
  articuloForm!: FormGroup;
  selectedFile: File | null = null;  // Para almacenar el archivo de imagen seleccionado
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private articuloService: ArticuloService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.articuloForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      references: [''],
      external_source: [''],
      author: ['', Validators.required],
      is_featured: [false]
    });
  }

  onSubmit(): void {
    if (this.articuloForm.valid) {
      const articuloData: Articulo = this.articuloForm.value;
  
      this.articuloService.createArticulo(articuloData, this.selectedFile).subscribe(
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
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];  // Almacenar el archivo seleccionado
    }
  }
  resetForm(): void {
    this.articuloForm.reset()
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

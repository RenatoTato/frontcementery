import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloService } from '@externo/services/articulo.service';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
  articuloForm!: FormGroup;
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
      const newArticulo: Articulo = this.articuloForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newArticulo);
  
      this.articuloService.createArticulo(newArticulo).subscribe(
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TumbaService } from '@externo/services/tumba.service';
import { Lote } from '@externo/models/tumba/lote.model';

@Component({
  selector: 'app-loteForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loteForm.component.html',
  styleUrl: './loteForm.component.css'
})
export class LoteFormComponent {
  loteForm!: FormGroup;
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private loteService: TumbaService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.loteForm = this.fb.group({
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
    if (this.loteForm.valid) {
      const newLote: Lote = this.loteForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newLote);
  
      this.loteService.createLote(newLote).subscribe(
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
    this.loteForm.reset()
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

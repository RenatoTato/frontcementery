import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Lote } from '@externo/models/tumba/lote.model';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { TumbaService } from '@externo/services/tumba.service';

@Component({
  selector: 'app-tumbaForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tumbaForm.component.html',
  styleUrl: './tumbaForm.component.css'
})
export class TumbaFormComponent {
  tumbaForm!: FormGroup;
  lotes: Lote[] = [];
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private tumbaService: TumbaService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.tumbaForm = this.fb.group({
      nicheNumber: [null, [Validators.required, Validators.min(1)]],  // Número de la tumba
      nicheType: ['T', Validators.required],  // Tipo de tumba (opciones T o E)
      available: [true, Validators.required],  // Disponibilidad
      nameLote: [null, Validators.required],  // Lote al que pertenece
    });
  }

  onSubmit(): void {
    if (this.tumbaForm.valid) {
      const newTumba: Tumba = this.tumbaForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newTumba);
  
      this.tumbaService.createTumba(newTumba).subscribe(
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
  loadLotes(): void {
    this.tumbaService.getLotes().subscribe(
      (response: Lote[]) => {
        this.lotes = response;
      },
      (error) => {
        console.error('Error al cargar los lotes:', error);
      }
    );
  }
  resetForm(): void {
    this.tumbaForm.reset()
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

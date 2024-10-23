import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DifuntoService } from '@externo/services/difunto.service'; 
import { Deudo, Relacion } from '@externo/models/difunto/deudo.model'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-deudoForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './deudoForm.component.html',
  styleUrl: './deudoForm.component.css'
})
export class DeudoFormComponent {
  deudoForm!: FormGroup;
  relacion = Object.values(Relacion)
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private deudoService: DifuntoService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.deudoForm = this.fb.group({
      names: ['', Validators.required],
      last_names: ['', Validators.required],
      idNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
    });
  }

  onSubmit(): void {
    if (this.deudoForm.valid) {
      const newDeudo: Deudo= this.deudoForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newDeudo);
  
      this.deudoService.createDeudo(newDeudo).subscribe(
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
    this.deudoForm.reset()
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



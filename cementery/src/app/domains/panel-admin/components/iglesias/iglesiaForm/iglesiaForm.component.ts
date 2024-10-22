import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IglesiaService } from '@externo/services/iglesia.service';
import { Iglesia } from '@externo/models/iglesia/iglesia.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iglesiaForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './iglesiaForm.component.html',
  styleUrl: './iglesiaForm.component.css'
})
export class IglesiaFormComponent {
  iglesiaForm!: FormGroup;
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private iglesiaService: IglesiaService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
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
      parish: ['', Validators.required],  // Elige una parroquia para asignar la iglesia
      image: [''],  // URL opcional de la imagen
    });
  }

  onSubmit(): void {
    if (this.iglesiaForm.valid) {
      const newIglesia: Iglesia= this.iglesiaForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newIglesia);
  
      this.iglesiaService.createIglesia(newIglesia).subscribe(
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




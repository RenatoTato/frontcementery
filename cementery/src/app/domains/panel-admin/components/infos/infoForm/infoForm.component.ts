import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Info } from '@externo/models/info/info.model';
import { InfoService } from '@externo/services/info.service';

@Component({
  selector: 'app-infoForm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './infoForm.component.html',
  styleUrl: './infoForm.component.css'
})
export class InfoFormComponent {
  servicioInfoForm!: FormGroup;
  selectedFile: File | null = null;
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private infoService: InfoService) { }

  ngOnInit() {
    this.initForm();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.servicioInfoForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description_short: [''],
      image: [''],  // Campo opcional para la URL de la imagen
      description: [''],
      features: ['', Validators.required],  // Características son obligatorias
      exclusions: [''],  // Exclusiones son opcionales
      price: [''],  // Precio es opcional, puedes agregar validadores si lo deseas
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];  // Almacenar el archivo seleccionado
    }
  }

  onSubmit(): void {
    if (this.servicioInfoForm.valid) {
      const newInfo: Info = this.servicioInfoForm.value;

      // Llamar al servicio pasando el formulario y el archivo seleccionado (si existe)
      this.infoService.createInfo(newInfo, this.selectedFile).subscribe(
        response => {
          console.log('Servicio creado:', response);
        },
        error => {
          console.error('Error al crear el servicio:', error);
        }
      );
    }
  }
  resetForm(): void {
    this.servicioInfoForm.reset()
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

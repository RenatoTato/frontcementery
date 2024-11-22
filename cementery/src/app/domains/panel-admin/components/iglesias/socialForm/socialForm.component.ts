import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IglesiaService } from '@externo/services/iglesia.service';
import { Social, SocialPlatform } from '@externo/models/iglesia/social.model';
import { Iglesia } from '@externo/models/iglesia/iglesia.model';


@Component({
  selector: 'app-socialForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './socialForm.component.html',
  styleUrl: './socialForm.component.css'
})
export class SocialFormComponent {

  RedSocialForm!: FormGroup;
  iglesias: Iglesia[] = [];
  socialPlatforms = Object.values(SocialPlatform)
  isDarkMode: boolean = false;

  constructor(private fb: FormBuilder, private socialService: IglesiaService) { }

  ngOnInit() {
    this.initForm();
    this.loadIglesias();
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.RedSocialForm = this.fb.group({
      stage_type: ['', Validators.required],  // Plataforma es requerida
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],  // La URL debe ser válida
      iglesia: ['', Validators.required],  // Iglesia es requerida
    });
  }

  onSubmit(): void {
    if (this.RedSocialForm.valid) {
      const newSocial: Social = this.RedSocialForm.value;
  
      // Verificar los datos que estás enviando
      console.log('Datos a enviar:', newSocial);
  
      this.socialService.createSocial(newSocial).subscribe(
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
  loadIglesias(): void {
    this.socialService.getReadIglesias().subscribe(
      (iglesias: Iglesia[]) => {
        this.iglesias = iglesias;
      },
      (error) => {
        console.error('Error al cargar las iglesias:', error);
      }
    );
  }

  resetForm(): void {
    this.RedSocialForm.reset()
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



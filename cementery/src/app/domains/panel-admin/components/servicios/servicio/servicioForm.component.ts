import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioService } from '@externo/services/servicio.service';
import { TumbaService } from '@externo/services/tumba.service';
import { DifuntoService } from '@externo/services/difunto.service';
import { Servicio } from '@externo/models/servicio/servicio.model';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { Difunto } from '@externo/models/difunto/difunto.model';

@Component({
  selector: 'app-servicioForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './servicioForm.component.html',
  styleUrl: './servicioForm.component.css'
})
export class ServicioFormComponent {
  servicioForm!: FormGroup;
  tumbas: Tumba[] = [];  // Lista de tumbas para seleccionar
  difuntos: Difunto[] = [];  // Lista de difuntos para seleccionar
  isDarkMode: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private servicioService: ServicioService, 
    private tumbaService: TumbaService,
    private difuntoService: DifuntoService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadTumbas();  // Cargar las tumbas disponibles
    this.loadDifuntos();  // Cargar los difuntos disponibles
    this.loadDarkModePreference();
  }

  initForm(): void {
    this.servicioForm = this.fb.group({
      startDate: [null, Validators.required],  // Fecha de inicio requerida
      endDate: [null],  // Fecha de vencimiento opcional
      ceremony: ['', Validators.required],  // Tipo de ceremonia requerida
      is_paid: [false, Validators.required],  // Estado de pago
      amount_paid: [null, Validators.min(0)],  // Monto pagado opcional
      payment_date: [null],  // Fecha de pago opcional
      numberTomb: [null],  // Tumba opcional
      deceased: [null, Validators.required],  // Difunto es requerido
    });
  }

  onSubmit(): void {
    if (this.servicioForm.valid) {
      const newServicio: Servicio = this.servicioForm.value;
      console.log('Datos a enviar:', newServicio);

      this.servicioService.createServicio(newServicio).subscribe(
        (response) => {
          console.log('Servicio creado:', response);
        },
        (error) => {
          console.error('Error al crear el servicio:', error);
        }
      );
    }
  }

  loadTumbas(): void {
    this.tumbaService.getReadTumbas().subscribe(
      (tumbas: Tumba[]) => {
        this.tumbas = tumbas;
        console.log('Tumbas:', this.tumbas);
      },
      (error) => console.error('Error al obtener las tumbas:', error)
    );
  }

  loadDifuntos(): void {
    this.difuntoService.getReadDifuntos().subscribe(
      (difuntos: Difunto[]) => {
        this.difuntos = difuntos;
        console.log('Difunto:', this.difuntos);
      },
      (error) => console.error('Error al obtener las tumbas:', error)
    );
  }

  resetForm(): void {
    this.servicioForm.reset();
  }

  cancelar(): void {
    this.resetForm();
  }
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const htmlElement = document.documentElement;

    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

  loadDarkModePreference(): void {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }
}
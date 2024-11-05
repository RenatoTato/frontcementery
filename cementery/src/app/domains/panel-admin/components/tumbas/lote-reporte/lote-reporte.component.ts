import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts'; // Librería de gráficos Apexcharts            
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TumbaService } from '@externo/services/tumba.service'; 
import { LoteOcupacion } from '@admin/models/reportes/tumba/loteocupacion.model';  
import { ChartOptions } from '@admin/models/reportes/tumba/chart-options.model';   
import { LoteFilter } from '@externo/models/tumba/loteb.model';
@Component({
  selector: 'app-lote-reporte',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './lote-reporte.component.html',
  styleUrl: './lote-reporte.component.css'
})
export class LoteReporteComponent implements OnInit{
  darkMode: boolean = false;
  public chartOptions: Partial<ChartOptions> | any;
  public lotesOcupacion: LoteOcupacion[] = [];
  searchForm: FormGroup;
  filterFields = [
    { name: 'blockName', label: 'Numero Lote' },
    { name: 'typeblock', label: 'Tipo Bloque' },
    { name: 'numbersblock', label: 'Numero Bloque' },
  ];

  constructor(
    private ocupacionLoteService: TumbaService,
    private fb: FormBuilder
  ) {
    // Define el formulario de búsqueda con campos para cada filtro
    this.searchForm = this.fb.group({
      blockName: ['',Validators.required],
      typeblock: ['',Validators.required],
      numbersblock: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOcupacionLotes(); // Cargar datos sin filtro al inicio
    this.loadDarkModePreference();
    this.loadOcupacionLotes()
  }

  // Cargar los datos de ocupación de lote con filtros
  loadOcupacionLotes(filterParams?: LoteFilter): void {
    this.ocupacionLoteService.getOcupacionLote(filterParams).subscribe((data: LoteOcupacion[]) => {
      this.lotesOcupacion = data;
      this.loadChartData();
    });
  }

  // Ejecuta la búsqueda cuando el usuario envía el formulario
  onSearch(): void {
    const filterParams = this.searchForm.value;
    this.loadOcupacionLotes(filterParams);
  }
  resetFilters(): void {
    this.searchForm.reset();
    this.loadOcupacionLotes();
  }

  loadChartData(): void {
    const labels = this.lotesOcupacion.map(lote => `${lote.blockName} (Tipo: ${lote.typeblock}, Número: ${lote.numbersblock})`);
    const series = this.lotesOcupacion.map(lote => (lote.ocupadas / lote.limite) * 100);

    this.chartOptions = {
      series,
      chart: {
        type: 'pie',
        width: '100%',
        height: 350
      },
      labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkMode', String(this.darkMode));
  }

  loadDarkModePreference(): void {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', this.darkMode);
  }
}
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
  showFilters:boolean=false;
  chartType: 'pie' | 'bar' = 'pie'; // Controla el tipo de gráfico

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
      blockName: ['', Validators.required],
      typeblock: ['', Validators.required],
      numbersblock: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOcupacionLotes();
    this.loadDarkModePreference();
  }

  loadOcupacionLotes(filterParams?: LoteFilter): void {
    this.ocupacionLoteService.getOcupacionLote(filterParams).subscribe((data: LoteOcupacion[]) => {
      this.lotesOcupacion = data;
      this.updateChartOptions(); // Llamar al actualizar la ocupación
    });
  }

  onSearch(): void {
    const filterParams = this.searchForm.value;
    this.loadOcupacionLotes(filterParams);
  }

  resetFilters(): void {
    this.searchForm.reset();
    this.loadOcupacionLotes();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  updateChartOptions(): void {
    const labels = this.lotesOcupacion.map(lote => `${lote.blockName} (Tipo: ${lote.typeblock}, Número: ${lote.numbersblock})`);
    const seriesData = this.lotesOcupacion.map(lote => (lote.ocupadas / lote.limite) * 100);
  
    // Estructura del series para gráficos de barras y de pie
    this.chartOptions = {
      series: this.chartType === 'bar' ? [{ name: 'Ocupación (%)', data: seriesData }] : seriesData,
      chart: {
        type: this.chartType,
        height: 350
      },
      labels: this.chartType === 'pie' ? labels : undefined, // Solo para gráfico de pie
      xaxis: this.chartType === 'bar' ? {
        categories: labels, // Categorías para el gráfico de barras
        title: {
          text: 'Porcentaje de ocupacion de lotes'
        }
      } : undefined,
      plotOptions: this.chartType === 'bar' ? {
        bar: {
          horizontal: true
        }
      } : undefined,
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(2)}%`
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  toggleChartType(): void {
    this.chartType = this.chartType === 'pie' ? 'bar' : 'pie';
    this.updateChartOptions(); // Actualizar las opciones del gráfico
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
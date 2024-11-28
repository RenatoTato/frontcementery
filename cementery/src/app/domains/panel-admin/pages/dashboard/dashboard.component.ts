import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ChartOptions } from '@admin/models/reportes/tumba/chart-options.model';
import { ServicioService } from '@externo/services/servicio.service';
import { TumbaService } from '@externo/services/tumba.service';
import { ServicioReporte } from '@admin/models/reportes/servicio/servicioreporte.model';
import { ServicioDifunto } from '@admin/models/reportes/difunto/serviciod.mode';
import { LoteOcupacion } from '@admin/models/reportes/tumba/loteocupacion.model';
import { TumbaEstadoResponse } from '@admin/models/reportes/tumba/tumbaestado.model';
import { LoteFilter } from '@externo/models/tumba/loteb.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  public servicioChartOptions: Partial<ChartOptions> = {};
  public difuntoChartOptions: Partial<ChartOptions> = {};
  public loteChartOptions: Partial<ChartOptions> = {};
  public tumbaChartOptions: Partial<ChartOptions> = {};
  filterForm: FormGroup;
  showFilters: boolean = false;

  darkMode: boolean = false;

  constructor(
    private servicioService: ServicioService,
    private tumbaService: TumbaService,
    private fb: FormBuilder,
  ) {
  this.filterForm = this.fb.group({
    blockName: [''],
    typeblock: [''],
    numbersblock: ['']
  });
}



  ngOnInit(): void {
    this.loadServicioData();
    this.loadDifuntoData();
    this.loadLoteOcupacionData();
    this.loadTumbaEstadoData();
    this.loadDarkModePreference();
  }

  // Cargar datos de Servicios
  loadServicioData(): void {
    this.servicioService.getServicioReporte().subscribe((data: ServicioReporte[]) => {
      const labels = data.map(d => d.ceremony);
      const activos = data.map(d => d.activos);
      const completados = data.map(d => d.completados);
      const pendientes = data.map(d => d.pendiente_pago);

      this.servicioChartOptions = {
        series: [
          { name: 'Activos', data: activos },
          { name: 'Completados', data: completados },
          { name: 'Pendientes', data: pendientes }
        ],
        chart: { type: 'bar', height: 350 },
        xaxis: { categories: labels, title: { text: 'Servicios' } },
        yaxis: { title: { text: 'Cantidad' } },
        plotOptions: { bar: { horizontal: true } }
      };
    });
  }

  // Cargar datos de Difuntos
  loadDifuntoData(): void {
    this.servicioService.getServicioDifunto().subscribe((data: ServicioDifunto[]) => {
      // Mapeamos los datos de la API
      const labels = data.map(d => d.ceremony);
      const seriesData = data.map(d => d.difunto_count);

      // Configuración para gráfico de tipo 'pie'
      this.difuntoChartOptions = {
        series: seriesData, // Un arreglo simple
        chart: { type: 'pie', height: 350 },
        labels: labels, // Etiquetas para cada segmento
        dataLabels: { enabled: true }
      };
    });
  }
  

  // Cargar datos de Estado de Tumbas
  loadTumbaEstadoData(): void {
    this.tumbaService.getTumbasEstado().subscribe((response: TumbaEstadoResponse) => {
      // Extraer los datos del array
      const data = response.results;

      // Procesar los datos
      const disponibles = data.filter(t => t.available).length;
      const ocupadas = data.length - disponibles;

      // Configurar las opciones del gráfico
      this.tumbaChartOptions = {
        series: [disponibles, ocupadas],
        chart: { type: 'pie', height: 350 },
        labels: ['Disponibles', 'Ocupadas'],
        dataLabels: { enabled: true }
      };
    });
  }
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  
  applyFilters(): void {
    const filterParams: LoteFilter = this.filterForm.value;
    this.loadLoteOcupacionData(filterParams);
  }
  
  resetFilters(): void {
    this.filterForm.reset();
    this.loadLoteOcupacionData();
  }
  
  loadLoteOcupacionData(filterParams ?: LoteFilter): void {
    this.tumbaService.getOcupacionLote(filterParams).subscribe((data: LoteOcupacion[]) => {
      const labels = data.map(l => `Lote ${l.blockName}`);
      const ocupados = data.map(l => l.ocupadas);
      const disponibles = data.map(l => l.disponibles);
  
      this.loteChartOptions = {
        series: [
          { name: 'Ocupados', data: ocupados },
          { name: 'Disponibles', data: disponibles }
        ],
        chart: { type: 'bar', height: 350 },
        xaxis: { categories: labels, title: { text: 'Lotes' } },
        yaxis: { title: { text: 'Cantidad' } },
        plotOptions: { bar: { horizontal: false } }
      };
    });
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
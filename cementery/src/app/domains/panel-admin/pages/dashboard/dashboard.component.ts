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
    this.filterForm.patchValue({ blockName: 1 }); 
    this.loadServicioData();
    this.loadDifuntoData();
    this.loadTumbaEstadoData();
    this.applyFilters();
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
    // Crear el filtro con nameLote = 153
    const filterParams = { nameLote: 153 };
  
    this.tumbaService.getTumbasEstado(undefined, undefined, filterParams).subscribe((response: TumbaEstadoResponse) => {
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

  // Método para cargar datos de ocupación de lotes
  loadLoteOcupacionData(filterParams?: LoteFilter): void {
    this.tumbaService.getOcupacionLote(filterParams).subscribe((data: LoteOcupacion[]) => {
      // Ordenar datos para que el lote con blockName === 1 siempre esté primero
      const sortedData = data.sort((a, b) => {
        if (a.blockName === 1) return -1; // Lote 1 al inicio
        if (b.blockName === 1) return 1;
        return a.blockName - b.blockName; // Orden numérico ascendente
      });

      const labels = sortedData.map(l => `Lote ${l.blockName}`);
      const ocupados = sortedData.map(l => l.ocupadas);
      const disponibles = sortedData.map(l => l.disponibles);

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
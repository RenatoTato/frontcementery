import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ServicioService } from '@externo/services/servicio.service';
import { ChartOptions } from '@admin/models/reportes/tumba/chart-options.model'; 
import { ServicioReporte } from '@admin/models/reportes/servicio/servicioreporte.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicio-reporte',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './servicio-reporte.component.html',
  styleUrl: './servicio-reporte.component.css'
})
export class ServicioReporteComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>={};
  public servicioEstadoData: ServicioReporte[] = [];
  darkMode: boolean = false;
  chartType: 'bar' | 'pie' = 'bar'; // Cambia entre gráfico de barras y circular

  constructor(private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.loadServicioEstadoData();
    this.loadDarkModePreference();
  }

  loadServicioEstadoData(): void {
    this.servicioService.getServicioReporte().subscribe((data: ServicioReporte[]) => {
      this.servicioEstadoData = data;
      this.loadChartOptions();
    });
  }

  loadChartOptions(): void {
    const labels = this.servicioEstadoData.map(s => s.ceremony);
    const seriesDataActivos = this.servicioEstadoData.map(s => s.activos);
    const seriesDataCompletados = this.servicioEstadoData.map(s => s.completados);
    const seriesDataPendientesPago = this.servicioEstadoData.map(s => s.pendiente_pago);

    this.chartOptions = {
      series: [
        { name: 'Activos', data: seriesDataActivos },
        { name: 'Completados', data: seriesDataCompletados },
        { name: 'Pendientes de Pago', data: seriesDataPendientesPago }
      ],
      chart: {
        type: this.chartType,
        height: 350
      },
      labels: this.chartType === 'pie' ? labels : undefined,
      xaxis: this.chartType === 'bar' ? { categories: labels, title: { text: 'Tipo de Ceremonia' } } : undefined,
      yaxis: this.chartType === 'bar' ? { title: { text: 'Número de Servicios' } } : undefined,
      plotOptions: this.chartType === 'bar' ? { bar: { horizontal: true } } : undefined,
      dataLabels: {
        enabled: true
      }
    };
  }

  toggleChartType(): void {
    this.chartType = this.chartType === 'bar' ? 'pie' : 'bar';
    this.loadChartOptions();
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
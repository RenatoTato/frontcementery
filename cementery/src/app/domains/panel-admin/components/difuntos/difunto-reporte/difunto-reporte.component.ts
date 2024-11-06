import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOptions } from '@admin/models/reportes/tumba/chart-options.model'; 
import { ServicioService } from '@externo/services/servicio.service'; 
import { ServicioDifunto } from '@admin/models/reportes/difunto/serviciod.mode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-difunto-reporte',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './difunto-reporte.component.html',
  styleUrl: './difunto-reporte.component.css'
})
export class DifuntoReporteComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> = {}; // Inicializar con un objeto vacío
  public servicioDifuntoData: ServicioDifunto[] = [];
  public chartType: 'bar' | 'pie' = 'bar'; // Variable para el tipo de gráfico
  darkMode: boolean = false;

  constructor(private difuntoService: ServicioService) {}

  ngOnInit(): void {
    this.loadServicioDifuntoData();
    this.loadDarkModePreference();
  }

  loadServicioDifuntoData(): void {
    this.difuntoService.getServicioDifunto().subscribe((data: ServicioDifunto[]) => {
      this.servicioDifuntoData = data;
      this.updateChartOptions(); // Cargar opciones de gráfico
    });
  }

  updateChartOptions(): void {
    const labels = this.servicioDifuntoData.map(s => s.ceremony);
    const seriesData = this.servicioDifuntoData.map(s => s.difunto_count);

    if (this.chartType === 'bar') {
      this.chartOptions = {
        series: [{ name: 'Difuntos', data: seriesData }], // Serie de datos
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: labels,
          title: {
            text: 'Número de Difuntos'
          }
        },
        yaxis: {
          title: {
            text: 'Tipo de Servicio'
          }
        }
      };
    } else {
      this.chartOptions = {
        series: seriesData,
        chart: {
          type: 'pie',
          height: 350
        },
        labels: labels,
        dataLabels: {
          enabled: true
        }
      };
    }
  }

  toggleChartType(): void {
    this.chartType = this.chartType === 'bar' ? 'pie' : 'bar';
    this.updateChartOptions(); // Actualizar el gráfico
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
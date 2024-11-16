import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import { ServicioService } from '@externo/services/servicio.service';
import { ChartOptions } from '@admin/models/reportes/tumba/chart-options.model'; 
import { ServicioReporte } from '@admin/models/reportes/servicio/servicioreporte.model';
import { CommonModule } from '@angular/common';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-servicio-reporte',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './servicio-reporte.component.html',
  styleUrl: './servicio-reporte.component.css'
})
export class ServicioReporteComponent implements OnInit {
  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef; // Agregar aquí
  public chartOptions: Partial<ChartOptions>={};
  public servicioEstadoData: ServicioReporte[] = [];
  private observer: MutationObserver = new MutationObserver(() => {});
  darkMode: boolean = false;
  chartType: 'bar' | 'pie' = 'bar'; // Cambia entre gráfico de barras y circular
  constructor(private servicioService: ServicioService) {}

  
  ngOnInit(): void {
    this.loadServicioEstadoData();
    this.loadDarkModePreference();

    // Inicializar el MutationObserver
    this.observer = new MutationObserver(() => {
      this.loadChartOptions(); // Recargar opciones del gráfico al detectar cambios
    });

    // Observar cambios en la clase `dark`
    this.observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  ngOnDestroy(): void {
    // Desconectar el observer para evitar fugas de memoria
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  loadServicioEstadoData(): void {
    this.servicioService.getServicioReporte().subscribe((data: ServicioReporte[]) => {
      this.servicioEstadoData = data;
      this.loadChartOptions();
    });
  }

  loadChartOptions(): void {
    // Detectar si el modo oscuro está activado
    const isDarkMode = document.documentElement.classList.contains('dark'); 
  
    // Preparar datos
    const labels = this.servicioEstadoData.map(s => s.ceremony);
    const seriesDataActivos = this.servicioEstadoData.map(s => s.activos);
    const seriesDataCompletados = this.servicioEstadoData.map(s => s.completados);
    const seriesDataPendientesPago = this.servicioEstadoData.map(s => s.pendiente_pago);
  
    // Configuración del gráfico
    this.chartOptions = {
      series: [
        { name: 'Activos', data: seriesDataActivos },
        { name: 'Completados', data: seriesDataCompletados },
        { name: 'Pendientes de Pago', data: seriesDataPendientesPago }
      ],
      chart: {
        type: this.chartType,
        height: 350,
        background: 'transparent' // Fondo transparente para integrarse con el tema
      },
      labels: this.chartType === 'pie' ? labels : undefined,
      xaxis: this.chartType === 'bar' 
        ? {
            categories: labels,
            title: {
              text: 'Tipo de Ceremonia',
              style: {
                color: isDarkMode ? '#E5E7EB' : '#1F2937' // Cambia el color según el tema
              }
            },
            labels: {
              style: {
                colors: isDarkMode ? '#E5E7EB' : '#1F2937' // Cambia el color de las etiquetas
              }
            }
          }
        : undefined,
      yaxis: this.chartType === 'bar' 
        ? {
            title: {
              text: 'Número de Servicios',
              style: {
                color: isDarkMode ? '#E5E7EB' : '#1F2937' // Cambia el color según el tema
              }
            },
            labels: {
              style: {
                colors: isDarkMode ? '#E5E7EB' : '#1F2937' // Cambia el color de las etiquetas
              }
            }
          }
        : undefined,
      plotOptions: this.chartType === 'bar' 
        ? { 
            bar: { horizontal: true }
          } 
        : undefined,
      dataLabels: {
        enabled: true,
        style: {
          colors: [isDarkMode ? '#E5E7EB' : '#1F2937'] // Cambia el color de las etiquetas de datos
        }
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
  downloadFullPDF(): void {
    const content = this.reportContent.nativeElement;

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // Margen de 10mm a los lados
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pageHeight - 20) {
        // Si el contenido cabe en una página
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      } else {
        // Si el contenido requiere múltiples páginas
        let yPosition = 10;
        let remainingHeight = imgHeight;

        while (remainingHeight > 0) {
          pdf.addImage(imgData, 'PNG', 10, yPosition, imgWidth, imgHeight);
          remainingHeight -= pageHeight - 20;
          yPosition = 10;
          if (remainingHeight > 0) {
            pdf.addPage();
          }
        }
      }

      pdf.save('reporte-completo.pdf');
    }).catch((error) => {
      console.error('Error al generar el PDF:', error);
    });
  }
}
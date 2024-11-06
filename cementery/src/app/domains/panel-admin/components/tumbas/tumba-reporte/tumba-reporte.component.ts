import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TumbaService } from '@externo/services/tumba.service';
import { TumbaEstado, TumbaEstadoResponse } from '@admin/models/reportes/tumba/tumbaestado.model'; 
import { NgApexchartsModule } from 'ng-apexcharts';
import { TumbaFilter } from '@externo/models/tumba/tumbab.model';
import { ChartOptions } from '@admin/models/reportes/tumba/chart-options.model'; 

@Component({
  selector: 'app-tumba-reporte',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgApexchartsModule],
  templateUrl: './tumba-reporte.component.html',
  styleUrl: './tumba-reporte.component.css'
})
export class TumbaReporteComponent  implements OnInit {
  tumbaEstadoList: TumbaEstado[] = [];
  currentPage: number = 1;
  pageSize: number = 17;
  totalItems: number = 0;
  totalPages: number = 0;
  isPaginated: boolean = true;
  searchForm: FormGroup;
  darkMode: boolean = false;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(
    private tumbaService: TumbaService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      nameLote: [''],
      nicheType: [''],
      available: ['']
    });
  }

  ngOnInit(): void {
    this.loadTumbaEstado();
    this.loadDarkModePreference();
  }

  // Cargar datos de tumbas con paginación y filtros
  loadTumbaEstado(): void {
    const filterParams: TumbaFilter = this.searchForm.value;

    // Ajustar la lógica de paginación en función de `nameLote`
    this.isPaginated = !filterParams.nameLote;

    this.tumbaService.getTumbasEstado(this.currentPage, this.pageSize, filterParams).subscribe(
      (response: TumbaEstadoResponse) => {
        this.tumbaEstadoList = response.results;
        this.totalItems = response.count;
        this.totalPages = this.isPaginated ? Math.ceil(this.totalItems / this.pageSize) : 1;
        this.loadChartData();
      }
    );
  }

  // Ejecutar búsqueda con filtros
  onSearch(): void {
    this.currentPage = 1; // Resetear a la primera página al buscar con nuevos filtros
    this.loadTumbaEstado();
  }

  // Cambio de página
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadTumbaEstado();
  }

  // Resetear filtros
  resetFilters(): void {
    this.searchForm.reset();
    this.currentPage = 1;
    this.loadTumbaEstado();
  }
  loadChartData(): void {
    const availableCount = this.tumbaEstadoList.filter(t => t.available).length;
    const occupiedCount = this.tumbaEstadoList.length - availableCount;

    this.chartOptions = {
      series: [
        { name: 'Tumbas Disponibles', data: [availableCount] },
        { name: 'Tumbas Ocupadas', data: [occupiedCount] }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        categories: ['Estado de Tumbas'],
        title: {
          text: 'Estado'
        }
      },
      yaxis: {
        title: {
          text: 'Cantidad'
        }
      },
      dataLabels: {
        enabled: true
      }
    };
  }
  // Alternar entre modo oscuro y claro
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.documentElement.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkMode', String(this.darkMode));
  }

  // Cargar preferencia de modo oscuro
  loadDarkModePreference(): void {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.classList.toggle('dark', this.darkMode);
  }
}
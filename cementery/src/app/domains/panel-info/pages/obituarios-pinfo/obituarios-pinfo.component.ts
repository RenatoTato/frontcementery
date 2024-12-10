import { Component, OnInit } from '@angular/core';
import { ObituarioService } from '@externo/services/obituario.service';
import { Obituario } from '@externo/models/obituario/obituario.model';
import { ObituarioFilter } from '@externo/models/obituario/obituariob.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ObituarioInfosComponent } from "../../component/obituario-infos/obituario-infos.component";

@Component({
  selector: 'app-obituarios-pinfo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './obituarios-pinfo.component.html',
  styleUrl: './obituarios-pinfo.component.css'
})
export class ObituariosPinfoComponent implements OnInit {
  obituarios: Obituario[] = [];
  filter: ObituarioFilter = {
    place: undefined,
    name: undefined,
    cementery: undefined,
    deceased: undefined,
    start_date: undefined,
    end_date: undefined,
    sborn_date: undefined,
    eborn_date: undefined,
    search: undefined,
  };
  page = 1;
  pageSize = 10;
  totalObituarios = 0;

  constructor(private obituarioService: ObituarioService) { }

  ngOnInit(): void {
    this.loadObituarios();
  }

  loadObituarios(): void {
    this.obituarioService
      .getObituarios(this.page, this.pageSize, this.filter)
      .subscribe((data) => {
        this.obituarios = Array.isArray(data) ? data : data.results;
      });
  }

  applyFilter(): void {
    this.page = 1; // Reinicia la paginación
    this.loadObituarios();
  }

  clearFilters(): void {
    this.filter = {
      place: undefined,
      name: undefined,
      cementery: undefined,
      deceased: undefined,
      start_date: undefined,
      end_date: undefined,
      sborn_date: undefined,
      eborn_date: undefined,
      search: undefined,
    };
    this.page = 1; // Reinicia la paginación
    this.loadObituarios();
  }


  setDateRange(range: string): void {
    const now = new Date();
    if (range === '365') {
      this.filter.start_date = new Date(now.setDate(now.getDate() - 365)).toISOString();
      this.filter.end_date = new Date().toISOString();
    } else if (range === '1825') {
      this.filter.start_date = new Date(now.setDate(now.getDate() - 1825)).toISOString();
      this.filter.end_date = new Date().toISOString();
    } else if (range === '3650') {
      this.filter.start_date = new Date(now.setDate(now.getDate() - 3650)).toISOString();
      this.filter.end_date = new Date().toISOString();
    } else {
      this.filter.start_date = undefined;
      this.filter.end_date = undefined;
    }
    this.applyFilter();
  }

  setDecadeRange(decade: number | null): void {
    if (decade === null) {
      this.filter.sborn_date = undefined;
      this.filter.eborn_date = undefined;
    } else {
      this.filter.sborn_date = new Date(`${decade}-01-01T00:00:00Z`).toISOString();
      this.filter.eborn_date = new Date(`${decade + 9}-12-31T23:59:59Z`).toISOString();
    }
    this.applyFilter();
  }
  setPlace(event: Event): void {
    const input = event.target as HTMLInputElement; // Conversión de tipo aquí
    this.filter.place = input?.value || ''; // Asigna el valor al filtro
    this.applyFilter();
  }

  formatName(name: string | undefined): string {
    if (!name) return 'Nombre no disponible';
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  setCemetery(event: Event): void {
    const input = event.target as HTMLInputElement; // Conversión de tipo aquí
    this.filter.cementery = input?.value || ''; // Asigna el valor al filtro
    this.applyFilter();
  }
  
  setSearch(event: Event): void {
    const input = event.target as HTMLInputElement; // Conversión de tipo aquí
    this.filter.name = input?.value || ''; // Asigna el valor al filtro
    this.applyFilter();
  }


  onPageChange(page: number): void {
    this.page = page;
    this.loadObituarios();
  }
}
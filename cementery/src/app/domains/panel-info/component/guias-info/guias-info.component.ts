import { Component, OnInit } from '@angular/core';
import { GuiaService } from '@externo/services/guia.service';
import { Guia } from '@externo/models/guia/guia.model';
import { GuiaFilter } from '@externo/models/guia/guiab.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-guias-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guias-info.component.html',
  styleUrl: './guias-info.component.css'
})
export class GuiasInfoComponent implements OnInit {
  guias: Guia[] = [];
  activeIndex: number = 0;
  currentGuia: Guia | null = null;

  constructor(private guiaService: GuiaService) {}

  ngOnInit(): void {
    this.loadGuia(this.activeIndex); // Carga la primera guía
  }

  loadGuia(index: number): void {
    this.guiaService.getReadGuias().subscribe((data: Guia[]) => {
      this.guias = data;
      this.currentGuia = this.guias[index];
    });
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.guias.length;
    this.loadGuia(this.activeIndex); // Carga la siguiente guía
  }

  prev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.guias.length) % this.guias.length;
    this.loadGuia(this.activeIndex); // Carga la guía anterior
  }
}
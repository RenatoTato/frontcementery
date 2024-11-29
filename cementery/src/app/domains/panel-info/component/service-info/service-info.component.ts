import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { InfoService } from '@externo/services/info.service';
import { Info } from '@externo/models/info/info.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-service-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-info.component.html',
  styleUrl: './service-info.component.css'
})
export class ServiceInfoComponent implements OnInit {
  infos: Info[] = [];

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.loadInfos();
  }
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  scrollCarousel(direction: number): void {
    const carousel = document.querySelector('.snap-x') as HTMLElement;
    const cardWidth = 350 + 32; // Ancho de la tarjeta + gap
    carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }
  loadInfos(): void {
    this.infoService.getInfos().subscribe({
      next: (data) => {
        // Verificamos si el backend devuelve una estructura paginada o un array
        this.infos = Array.isArray(data) ? data : data.results;
      },
      error: (err) => {
        console.error('Error al cargar los paquetes:', err);
      }
    });
  }
  formatFeatures(features: string): string[] {
    if (!features) return [];
    return features.split('.').map(feature => feature.trim()).filter(feature => feature);
  }
  formatFeaturesOrExclusions(data: string): string[] {
    if (!data) return []; // Retorna un array vacío si no hay datos
    return data
      .split('.')          // Divide el string en partes separadas por puntos
      .map(item => item.trim())  // Elimina espacios alrededor de cada elemento
      .filter(item => item);     // Filtra elementos vacíos
  }
}
import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '@externo/services/articulo.service';
import { InfoService } from '@externo/services/info.service';
import { ObituarioService } from '@externo/services/obituario.service';
import { IglesiaService } from '@externo/services/iglesia.service';
import { CommonModule } from '@angular/common';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { ArticuloInfoComponent } from '@info/component/articulo-info/articulo-info.component';
import { IglrsiasInfosComponent } from '@info/component/iglrsias-infos/iglrsias-infos.component';
import { ObituarioInfosComponent } from '@info/component/obituario-infos/obituario-infos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-dashboard',
  standalone: true,
  imports: [CommonModule, ArticuloInfoComponent, IglrsiasInfosComponent, ObituarioInfosComponent],
  templateUrl: './info-dashboard.component.html',
  styleUrl: './info-dashboard.component.css'
})
export class InfoDashboardComponent implements OnInit {
  articulos: Articulo[] = [];
  servicios: any[] = [];
  obituarios: any[] = [];
  iglesias: any[] = [];
  currentIndex: number = 0; // Índice actual del carrusel
  visibleCards: number = 3; // Número de cards visibles
  maxIndex: number = 0; // Máximo índice desplazable
  obituariosPerPage: number = 5; // Máximo de obituarios por "página"

  constructor(
    private articuloService: ArticuloService,
    private infoService: InfoService,
    private obituarioService: ObituarioService,
    private iglesiaService: IglesiaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadArticulos();
    this.loadServicios();
    this.loadObituarios();
    this.loadIglesias();
  }

  private loadArticulos() {
    this.articuloService.getReadArticulos({ is_featured: true }).subscribe((data) => {
      this.articulos = data;
    });
  }

  private loadServicios() {
    this.infoService.getReadInfos({ category: 'Servicios Exequiales' }).subscribe((data) => {
      this.servicios = data;
    });
  }

   // Calcular el máximo índice al cargar los obituarios
   calculateMaxIndex(): void {
    this.maxIndex = Math.max(0, this.obituarios.length - this.visibleCards);
  }

  // Mover a la izquierda
  moveLeft(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Mover a la derecha
  moveRight(): void {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }
  }

  // Ver más obituarios (puedes personalizar esto)
  loadMoreObituarios(): void {
    console.log("Cargar más obituarios...");
    // Aquí puedes hacer una nueva llamada al backend o manejar más lógica.
  }
  nextSlide(): void {
    const totalObituarios = this.obituarios.length;
    const nextIndex = this.currentIndex + this.obituariosPerPage;

    if (nextIndex < totalObituarios) {
      this.currentIndex = nextIndex;
    } else {
      this.currentIndex = 0; // Reinicia el carrusel si llega al final
    }
  }
  private loadObituarios() {
    this.obituarioService.getReadObituarios().subscribe((data) => {
      this.obituarios = data;
    });
  }

  private loadIglesias() {
    this.iglesiaService.getReadIglesias().subscribe((data) => {
      this.iglesias = data;
    });
  }
  verArticulo(id: number): void {
    this.router.navigate(['/articulos', id]); // Navega a la ruta con el ID
  }
}

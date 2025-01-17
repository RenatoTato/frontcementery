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
import { NotificationFormComponent } from "@shared/components/notification-form/notification-form.component";
import { Iglesia } from '@externo/models/iglesia/iglesia.model';

@Component({
  selector: 'app-info-dashboard',
  standalone: true,
  imports: [CommonModule, ArticuloInfoComponent, IglrsiasInfosComponent, NotificationFormComponent],
  templateUrl: './info-dashboard.component.html',
  styleUrl: './info-dashboard.component.css'
})
export class InfoDashboardComponent implements OnInit {
  articulos: Articulo[] = [];
  servicios: any[] = [];
  obituarios: any[] = [];
  iglesias: Iglesia[] = [];
  iglesiasLimitadas: Iglesia[] = []
  visibleObituaries = 3; // Cantidad de obituarios visibles
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
    this.startAutoScroll();
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

  private loadObituarios(): void {
    this.obituarioService.getObituarios(1, 9).subscribe((data) => {
      this.obituarios = Array.isArray(data) ? data : data.results;
      this.maxIndex = Math.ceil(this.obituarios.length / this.visibleObituaries) - 1;
    });
  }

  private startAutoScroll(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % (this.maxIndex + 1);
    }, 3000); // Cambia cada 3 segundos
  }
  navigateToList(): void {
    this.router.navigate(['/obituarios']);
  }
  loadIglesias(): void {
    this.iglesiaService.getReadIglesias().subscribe((iglesias) => {
      this.iglesias = iglesias;
      this.iglesiasLimitadas = iglesias.slice(3, 7); // Toma solo las primeras 3 iglesias
    });
  }



  verArticulo(id: number): void {
    this.router.navigate(['/articulos', id]); // Navega a la ruta con el ID
  }
  navigateToDetail(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID is undefined');
      return;
    }
    this.router.navigate(['/obituarios', id]);
  }
  verIglesia(id: number): void {
    this.router.navigate(['/iglesias', id]); // Navega a la ruta del detalle de iglesia
  }
}

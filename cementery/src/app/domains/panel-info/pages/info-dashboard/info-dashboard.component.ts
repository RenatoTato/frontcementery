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

@Component({
  selector: 'app-info-dashboard',
  standalone: true,
  imports: [CommonModule, ArticuloInfoComponent, IglrsiasInfosComponent, ObituarioInfosComponent],
  templateUrl: './info-dashboard.component.html',
  styleUrl: './info-dashboard.component.css'
})
export class InfoDashboardComponent  implements OnInit {
  articulos: Articulo[] = [];
  servicios: any[] = [];
  obituarios: any[] = [];
  iglesias: any[] = [];

  constructor(
    private articuloService: ArticuloService,
    private infoService: InfoService,
    private obituarioService: ObituarioService,
    private iglesiaService: IglesiaService
  ) {}

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
}

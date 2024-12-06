import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { Seccion } from '@externo/models/articulo/seccion.model';
import { ArticuloService } from '@externo/services/articulo.service';

@Component({
  selector: 'app-seccion-infos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-infos.component.html',
  styleUrl: './seccion-infos.component.css'
})
export class SeccionInfosComponent  {

}
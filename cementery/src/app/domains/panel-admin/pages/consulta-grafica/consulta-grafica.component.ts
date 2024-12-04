import { Component } from '@angular/core';
import { SvgmapComponent } from "@shared/components/svgmap/svgmap.component";
import { GridComponent } from "../../../shared/components/grid/grid.component";

@Component({
  selector: 'app-consulta-grafica',
  standalone: true,
  imports: [GridComponent],
  templateUrl: './consulta-grafica.component.html',
  styleUrl: './consulta-grafica.component.css'
})
export class ConsultaGraficaComponent {

}

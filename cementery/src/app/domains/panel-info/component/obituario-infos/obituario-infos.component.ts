import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Obituario } from '@externo/models/obituario/obituario.model'; // Ajusta la ruta según tu estructura


@Component({
  selector: 'app-obituario-infos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './obituario-infos.component.html',
  styleUrl: './obituario-infos.component.css'
})
export class ObituarioInfosComponent {
  @Input() obituario!: Obituario; // Recibe un objeto de tipo Obituario
}
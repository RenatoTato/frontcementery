import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iglesia } from '@externo/models/iglesia/iglesia.model'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-iglrsias-infos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iglrsias-infos.component.html',
  styleUrl: './iglrsias-infos.component.css'
})
export class IglrsiasInfosComponent {
  @Input() iglesia!: Iglesia; // Recibe un objeto de tipo Iglesia
}
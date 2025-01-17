import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iglesia } from '@externo/models/iglesia/iglesia.model'; // Ajusta la ruta según tu estructura
import { Social, SocialPlatform } from '@externo/models/iglesia/social.model';
import { Parroquia } from '@externo/models/iglesia/parroquia.model';

@Component({
  selector: 'app-iglrsias-infos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iglrsias-infos.component.html',
  styleUrl: './iglrsias-infos.component.css'
})
export class IglrsiasInfosComponent {
  @Input() iglesia?: Iglesia; // Iglesia que se muestra si está presente
  @Input() parroquia?: Parroquia; // Parroquia que se muestra si está presente
  @Input() socials: Social[] = []; // Redes sociales asociadas
  @Input() modo: 'lista' | 'detalle' = 'lista'; // Modo del componente
  @Output() clickIglesia = new EventEmitter<number>(); // Emite el ID de la iglesia al hacer clic
  
  // Método para obtener el nombre de la plataforma social
  getSocialPlatformName(platform: SocialPlatform): string {
    return platform;
  }
  
  onClick(): void {
    if (this.modo === 'lista' && this.iglesia?.id) {
      this.clickIglesia.emit(this.iglesia.id); // Emitir solo si hay un ID válido
    }
  }  

}
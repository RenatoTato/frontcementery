import { MapService } from '@admin/service/map-service/map.service';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tabla-generica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-generica.component.html',
  styleUrl: './tabla-generica.component.css'
})
export class TablaGenericaComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() keys: string[] = [];
  @Input() mapMethods: { [key: string]: (value: any) => string } = {}; // Métodos de mapeo
  @Input() actionTemplate?: TemplateRef<any>;

  // Método para aplicar el mapeo dinámico
  getMappedValue(key: string, value: any): string {
    console.log(`Key: ${key}, Value: ${value}`);
    const method = this.mapMethods[key];
    return method ? method(value) : value;
  }
}

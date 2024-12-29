import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}

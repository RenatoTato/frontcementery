import { Component, OnInit } from '@angular/core';
import { TumbaService } from '@externo/services/tumba.service';
import { LoteOcupacion } from '@admin/models/reportes/tumba/loteocupacion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-svgmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './svgmap.component.html',
  styleUrl: './svgmap.component.css'
})
export class SvgmapComponent implements OnInit {
  ocupacionLote: LoteOcupacion[] = [];
  selectedBlockId: number | null = null;
  estadosBloques: { [key: number]: number } = {}; // Guarda el estado de cada bloque
  selectedBlockData: any = null;         // Datos del bloque seleccionado para el grid de detalles
  // Definición de la constante en la clase
  
  constructor(private tumbaService: TumbaService) { }

  ngOnInit(): void {
    this.loadOcupacionLote();
  }

  loadOcupacionLote(): void {
    this.tumbaService.getOcupacionLote().subscribe(
      (data) => {
        this.ocupacionLote = data;
        this.calcularEstadosBloques(); // Calcula el estado de cada bloque después de cargar datos
      },
      (error) => {
        console.error('Error al cargar la ocupación de lotes:', error);
      }
    );
  }

  static readonly COLOR_MAP: Record<number, string> = {
    1: 'fill-red-500',
    2: 'fill-yellow-400',
    3: 'fill-green-500',
  };

  getFillColor(bloqueId: number): string {
    return SvgmapComponent.COLOR_MAP[this.estadosBloques[bloqueId]] || '';
  }
  // Método para calcular el estado de ocupación de cada bloque
  calcularEstadosBloques(): void {
    this.ocupacionLote.forEach((bloque) => {
      this.estadosBloques[bloque.id] = (bloque.ocupadas === bloque.limite)
        ? 1
        : (bloque.disponibles === bloque.limite)
          ? 3
          : 2;
    });
  }

  verDetallesBloque(bloqueId: number): void {
    this.selectedBlockId = bloqueId;
    this.loadTumbaEstado(bloqueId);
  }

  loadTumbaEstado(blockId: number): void {
    this.tumbaService.getTumbasEstado(undefined, undefined, { nameLote: blockId }).subscribe(
      (data) => {
        // Maneja el estado o datos obtenidos para el bloque
      },
      (error) => {
        console.error('Error al cargar el estado de tumbas:', error);
      }
    );
  }
  cerrarDetalles(): void {
    this.selectedBlockData = null;
    this.selectedBlockId = null;
  }
}
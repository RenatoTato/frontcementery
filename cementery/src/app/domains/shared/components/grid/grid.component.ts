import { Component, OnInit } from '@angular/core';
import { TumbaService } from '@externo/services/tumba.service';
import { LoteOcupacion } from '@admin/models/reportes/tumba/loteocupacion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {
  ocupacionLote: LoteOcupacion[] = [];
  selectedBlockId: number | null = null;
  estadosBloques: { [key: number]: number } = {}; // Guarda el estado de cada bloque
  selectedBlockData: any = null;         // Datos del bloque seleccionado para el grid de detalles
  tumbasEstado: any[] = [];  // Agrega esta propiedad para almacenar los datos de tumbas
  filas: number = 0;
  columnas: number = 0;
  readonly blockSizes: Record<string, { width: number; height: number }> = {
    A: { width: 34.41, height: 9.46 },
    B: { width: 42.58, height: 10.75 },
    C: { width: 15.05, height: 9.46 },
    D: { width: 26.67, height: 9.46 },
    F: { width: 76.99, height: 10.75 },
    G: { width: 53.76, height: 10.75 },
    H: { width: 53.76, height: 10.75 },
    J: { width: 85.59, height: 9.46 },
    L: { width: 85.59, height: 19.36 },
    M: { width: 85.59, height: 26.67 },
    N: { width: 72.69, height: 48.17 },
    S: { width: 55.49, height: 29.25 },
    T: { width: 55.49, height: 19.36 },
};
  constructor(private tumbaService: TumbaService) { }

  ngOnInit(): void {
    this.loadOcupacionLote();
  }

  loadOcupacionLote(): void {
    this.tumbaService.getOcupacionLote().subscribe(
      (data) => {
        this.ocupacionLote = data;
        // Calcula el estado de cada bloque después de cargar datos
      },
      (error) => {
        console.error('Error al cargar la ocupación de lotes:', error);
      }
    );
  }



  getFillColor(loteId: number): string {
    const lote = this.ocupacionLote.find(l => l.id === loteId);
    if (lote) {
      if (lote.ocupadas === lote.limite) {
        return 'cls-occupied'; // Clase para el lote lleno
      } else if (lote.ocupadas === 0) {
        return 'cls-available'; // Clase para el lote vacío
      } else {
        return 'cls-intermediate'; // Clase para el lote en estado intermedio
      }
    }
    return 'cls-10'; // Clase predeterminada si no se encuentra el lote
  }

  verDetallesBloque(bloqueId: number): void {
    const lote = this.ocupacionLote.find(l => l.id === bloqueId);
    if (lote) {
      this.selectedBlockId = bloqueId;
      this.filas = lote.filas;
      this.columnas = lote.columnas;
      this.loadTumbaEstado(bloqueId);
    }
  }
  getBlockSize(typeblock: LoteOcupacion['typeblock']): { width: number; height: number } {
    return this.blockSizes[typeblock] || { width: 0, height: 0 };
  }

  getTransform(lote: any): string {
    const translate =
      lote.trans_r_x !== 0.1 || lote.trans_r_y !== 0.1
        ? `translate(${lote.trans_r_x}, ${lote.trans_r_y})`
        : '';
    const rotate = lote.rotation !== 0 ? `rotate(${lote.rotation})` : '';
    return `${translate} ${rotate}`.trim();
  }

  handleKeyPress(event: KeyboardEvent, id: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.verDetallesBloque(id); // Llama a la función del clic
      event.preventDefault(); // Previene desplazamientos por barra espaciadora
    }
  }
  getTextTransform(lote: any): string {
    const translate =
      lote.rotation === -180
        ? `translate(${lote.trans_t_x -5}, ${lote.trans_t_y})` // Ajusta según lo que necesites
        : lote.rotation !== 0
        ? `translate(${lote.trans_t_x + 6}, ${lote.trans_t_y + 4.5})`
        : lote.trans_t_x !== 0.1 || lote.trans_t_y !== 0.1
        ? `translate(${lote.trans_t_x + 4.5}, ${lote.trans_t_y})`
        : `translate(${lote.x}, ${lote.y})`;
  
    const rotate =
      lote.rotation === -180
        ? `rotate(${lote.rotation-90})`
        : lote.rotation !== 0
        ? `rotate(${lote.rotation - 180})`
        : 'rotate(-90)';
  
    return `${translate} ${rotate}`.trim();
  }
  loadTumbaEstado(blockId: number): void {
    this.tumbaService.getTumbasEstado(undefined, undefined, { nameLote: blockId }).subscribe(
      (data) => {
        this.tumbasEstado = data.results;
      },
      (error) => {
        console.error('Error al cargar el estado de tumbas:', error);
      }
    );
  }

  cerrarDetalles(): void {
    this.selectedBlockId = null;
    this.tumbasEstado = [];
  }
  getNichoDisplayText(nicho: any): string {
    return `${nicho.nicheNumber}${nicho.nicheType}`;
  }

  getShortDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}

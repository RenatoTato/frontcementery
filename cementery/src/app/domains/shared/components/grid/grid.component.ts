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

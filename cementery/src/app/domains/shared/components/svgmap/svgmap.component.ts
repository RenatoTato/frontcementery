import { Component, OnInit } from '@angular/core';
import { TumbaService } from '@externo/services/tumba.service';
import { LoteOcupacion } from '@admin/models/reportes/tumba/loteocupacion.model';
import { CommonModule } from '@angular/common';
import { TumbaEstado } from '@admin/models/reportes/tumba/tumbaestado.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-svgmap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './svgmap.component.html',
  styleUrl: './svgmap.component.css'
})
export class SvgmapComponent implements OnInit {
  nombreCompleto: string = ''; // Nombre completo ingresado por el usuario
  ocupacionLote: LoteOcupacion[] = []; // Lista de lotes
  tumbasEstado: TumbaEstado[] = []; // Tumbas del lote seleccionado
  columnas: number = 0; // Número de columnas del lote seleccionado
  loteSeleccionado: LoteOcupacion | null | undefined = null; // Permitir undefined
  constructor(private tumbaService: TumbaService) { }

  ngOnInit(): void {
    this.loadOcupacionLote();
  }
  readonly blockSizes = {
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

  // Carga la ocupación de los lotes
  loadOcupacionLote(): void {
    this.tumbaService.getOcupacionLote().subscribe(
      (data: LoteOcupacion[]) => {
        this.ocupacionLote = data;
      },
      (error) => {
        console.error('Error al cargar la ocupación de lotes:', error);
      }
    );
  }

  // Busca al difunto ingresado en la barra de búsqueda
  buscarDifunto(): void {
    if (!this.nombreCompleto.trim()) {
      alert('Por favor, ingresa el nombre completo del difunto.');
      return;
    }
  
    // Divide el nombre en nombres y apellidos
    const palabras = this.nombreCompleto.trim().split(/\s+/);
    if (palabras.length < 2) {
      alert('Por favor, ingresa al menos un nombre y un apellido.');
      return;
    }
  
    const nombres = palabras.slice(0, palabras.length - 2).join(' ');
    const apellidos = palabras.slice(-2).join(' ');

    this.tumbaService
      .getTumbasEstado(undefined, undefined, {
        nombre_difunto: nombres,
        apellido_difunto: apellidos,
      })
      .subscribe(
        (data) => {
          if (data.results.length > 0) {
            const tumbaEncontrada = data.results[0];

            // Identifica el lote de la tumba encontrada
            this.loteSeleccionado = this.ocupacionLote.find(
              (lote) => lote.id === tumbaEncontrada.nameLote
            );

            if (this.loteSeleccionado) {
              this.columnas = this.loteSeleccionado.columnas;

              // Cargar todas las tumbas del lote
              this.loadTumbasEstado(this.loteSeleccionado.id, tumbaEncontrada.nicheNumber);
            } else {
              alert('No se encontró el lote correspondiente al difunto.');
              this.resetSeleccion();
            }
          } else {
            alert('No se encontró ningún difunto con ese nombre.');
            this.resetSeleccion();
          }
        },
        (error) => {
          console.error('Error al buscar el difunto:', error);
        }
      );
  }
  getDifuntoFirstName(difunto: any): string {
    return difunto?.names?.split(' ')[0] ?? '';
  }

  getDifuntoLastName(difunto: any): string {
    return difunto?.last_names?.split(' ')[0] ?? '';
  }


  resetSeleccion(): void {
    this.loteSeleccionado = null;
    this.tumbasEstado = [];
  }

  // Carga las tumbas del lote utilizando el filtro `nameLote`
  loadTumbasEstado(loteId: number, nicheNumber?: number): void {
    this.tumbaService.getTumbasEstado(undefined, undefined, { nameLote: loteId }).subscribe(
      (data) => {
        // Si nicheNumber está definido, marca solo esa tumba como seleccionada
        this.tumbasEstado = data.results.map((tumba) => ({
          ...tumba,
          isSelected: nicheNumber ? tumba.nicheNumber === nicheNumber : false,
        }));
      },
      (error) => {
        console.error('Error al cargar las tumbas del lote:', error);
      }
    );
  }

  // Obtiene la clase para el color del lote
  getFillColor(loteId: number): string {
    // Solo el lote del difunto seleccionado debe resaltar
    return this.loteSeleccionado?.id === loteId ? 'cls-selected' : 'cls-default';
  }

  getNichoDisplayText(nicho: TumbaEstado): string {
    return `${nicho.nicheNumber}${nicho.nicheType}`;
  }

  getShortDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  // Cierra los detalles del bloque
  cerrarDetalles(): void {
    this.loteSeleccionado = null;
    this.tumbasEstado = [];
  }
  verDetallesBloque(bloqueId: number): void {
    const loteSeleccionado = this.ocupacionLote.find((lote) => lote.id === bloqueId);
  
    if (loteSeleccionado) {
      // Asegúrate de que `loteSeleccionado` no sea undefined antes de asignar
      this.loteSeleccionado = { ...loteSeleccionado, id: bloqueId }; // Asignar el objeto completo
      this.columnas = loteSeleccionado.columnas;
  
      // Cargar las tumbas del bloque seleccionado sin filtrar por `nicheNumber`
      this.loadTumbasEstado(bloqueId, undefined);
    } else {
      console.error('Lote no encontrado');
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
  getTextTransform(lote: any): string {
    const translate =
      lote.rotation === -180
        ? `translate(${lote.trans_t_x - 5}, ${lote.trans_t_y})` // Ajusta según lo que necesites
        : lote.rotation !== 0
          ? `translate(${lote.trans_t_x + 6}, ${lote.trans_t_y + 4.5})`
          : lote.trans_t_x !== 0.1 || lote.trans_t_y !== 0.1
            ? `translate(${lote.trans_t_x + 4.5}, ${lote.trans_t_y})`
            : `translate(${lote.x}, ${lote.y})`;

    const rotate =
      lote.rotation === -180
        ? `rotate(${lote.rotation - 90})`
        : lote.rotation !== 0
          ? `rotate(${lote.rotation - 180})`
          : 'rotate(-90)';

    return `${translate} ${rotate}`.trim();
  }
}
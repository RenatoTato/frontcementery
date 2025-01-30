import { Component, OnInit, HostListener } from '@angular/core';
import { TumbaService } from '@externo/services/tumba.service';
import { LoteOcupacion } from '@admin/models/reportes/tumba/loteocupacion.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lote } from '@externo/models/tumba/lote.model';

@Component({
  selector: 'app-loteForm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loteForm.component.html',
  styleUrl: './loteForm.component.css'
})
export class LoteFormComponent implements OnInit {
  ocupacionLote: LoteOcupacion[] = []; // Lista de lotes
  columnas: number = 0;
  loteSeleccionado: LoteOcupacion | null = null;
  isDragging: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;
  showAddLoteModal: boolean = false;
  showEditLoteModal: boolean = false;
  newLote: Partial<Lote> = {};
  selectedLote: Partial<Lote> = {};
  blockKeys: string[] = [];
  constructor(private tumbaService: TumbaService) { }

  ngOnInit(): void {
    this.loadOcupacionLote();
    this.blockKeys = Object.keys(this.blockProperties);
  }

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
  readonly blockProperties: Record<string, { columnas: number; filas: number; limite: number }> = {
    A: { columnas: 9, filas: 4, limite: 36 },
    B: { columnas: 11, filas: 4, limite: 44 },
    C: { columnas: 4, filas: 4, limite: 16 },
    D: { columnas: 7, filas: 4, limite: 28 },
    F: { columnas: 21, filas: 5, limite: 105 },
    G: { columnas: 14, filas: 4, limite: 56 },
    H: { columnas: 14, filas: 5, limite: 70 },
    J: { columnas: 20, filas: 1, limite: 20 },
    L: { columnas: 20, filas: 2, limite: 40 },
    M: { columnas: 20, filas: 3, limite: 60 },
    N: { columnas: 17, filas: 5, limite: 85 },
    S: { columnas: 13, filas: 3, limite: 39 },
    T: { columnas: 13, filas: 2, limite: 26 },
  };
  readonly loteCoordinates: Record<number, { x: number; y: number }> = {
    1: { x: 32.53, y: 659 },
    2: { x: 32.53, y: 585.88 },
    3: { x: 32.53, y: 474.05 },
    4: { x: 235.73, y: 474.19 },
    5: { x: 32.53, y: 383.72 },
    6: { x: 235.73, y: 383.72 },
    7: { x: 32.53, y: 280.35 },
    8: { x: 235.73, y: 280.35 },
    9: { x: 32.53, y: 181.42 },
    10: { x: 240.03, y: 181.42 },
    11: { x: 32.53, y: 56.68 },
    12: { x: 261.53, y: 56.68 }
  };

  getLoteX(blockName: number): number {
    return this.loteCoordinates[blockName]?.x ?? 0;
  }

  getLoteY(blockName: number): number {
    return this.loteCoordinates[blockName]?.y ?? 0;
  }
  getBlockSize(typeblock: string): { width: number; height: number } {
    return (this.blockSizes as any)[typeblock] || { width: 0, height: 0 };
  }

  generarNumbersBlock(blockName: number, typeblock: string): number {
    const lotesMismoTipo = this.ocupacionLote.filter(lote => lote.blockName === blockName && lote.typeblock === typeblock);
    const maxNumbersBlock = lotesMismoTipo.reduce((max, lote) => Math.max(max, lote.numbersblock || 0), 0);
    return maxNumbersBlock + 1;
  }

  updateLoteProperties(): void {
    if (this.newLote.typeblock) {
      const properties = this.blockProperties[this.newLote.typeblock];
      if (properties) {
        this.newLote.filas = properties.filas;
        this.newLote.columnas = properties.columnas;
        this.newLote.limite = properties.limite;
      }
    }
  }

  generateNewLote(): void {
    if (!this.newLote.blockName || !this.newLote.typeblock) {
      alert('Por favor, ingresa el Block Name y selecciona un Type Block.');
      return;
    }
    this.newLote.numbersblock = this.generarNumbersBlock(this.newLote.blockName, this.newLote.typeblock);
    console.log('Lote generado:', this.newLote);
    this.showAddLoteModal = false;
  }



  addLote(blockName: number, typeblock: string): void {
    const numbersblock = this.generarNumbersBlock(blockName, typeblock);
    const properties = this.blockProperties[typeblock];

    const newLote: LoteOcupacion = {
      id: 0,  // Se asignará por el backend si es autoincremental
      blockName,
      typeblock,
      numbersblock,
      filas: properties.filas,
      columnas: properties.columnas,
      limite: properties.limite,
      x: this.getLoteX(blockName),
      y: this.getLoteY(blockName),
      rotation: 0,
      text_x: 0,
      text_y: 0,
      trans_r_x: 0,
      trans_r_y: 0,
      trans_t_x: 0,
      trans_t_y: 0,
      ocupadas: 0, // Valor por defecto
      disponibles: properties.limite // Inicialmente todas las tumbas están disponibles
    };

    this.tumbaService.createLote(newLote).subscribe(
      response => {
        console.log('Lote creado con éxito', response);
        this.loadOcupacionLote();
      },
      error => {
        console.error('Error al crear el lote:', error);
      }
    );
  }

  editLote(existingLote: Lote, blockName: number, typeblock: string, numbersblock: number): void {
    if (!existingLote || existingLote.id == null) {
      console.error("Error: Lote no válido para edición.");
      return;
    }

    existingLote.blockName = blockName;
    existingLote.typeblock = typeblock;
    existingLote.numbersblock = numbersblock;

    const properties = this.blockProperties[typeblock];
    if (!properties) {
      // console.error(Error: El typeblock "${typeblock}" no es válido.);
      return;
    }

    existingLote.filas = properties.filas;
    existingLote.columnas = properties.columnas;
    existingLote.limite = properties.limite;

    this.tumbaService.updateLote(existingLote.id, existingLote).subscribe(
      response => {
        console.log('Lote actualizado con éxito', response);
        this.loadOcupacionLote();
      },
      error => console.error('Error al actualizar el lote:', error)
    );
  }
  saveLote(): void {
    if (!this.selectedLote.id) {
      console.error('Error: El ID del lote es nulo o indefinido.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas actualizar este lote?')) {
      this.tumbaService.updateLote(this.selectedLote.id, this.selectedLote as Lote).subscribe(
        () => {
          console.log('Lote actualizado con éxito');
          this.showEditLoteModal = false; // Cierra el modal tras la actualización
          this.loadOcupacionLote(); // Recarga los lotes
        },
        (error) => console.error('Error al actualizar el lote:', error)
      );
    }
  }

  // Habilita la edición de los valores de ubicación
  enableLoteEditing(): void {
    alert('Ahora puedes mover y rotar el lote en el mapa.');
    this.showEditLoteModal = false; // Cierra el modal para permitir la edición visual
  }

  // Actualiza filas, columnas y límite según el tipo de bloque seleccionado
  /** 📌 Inicia el arrastre */


  @HostListener('document:mouseup')
  stopDragging(): void {
    this.isDragging = false;
  }

  /** 📌 Mueve el lote y el texto en tiempo real */
  startDragging(event: MouseEvent, lote: LoteOcupacion): void {
    this.isDragging = true;
    this.loteSeleccionado = lote;

    // Ajustar el offset según la rotación del lote
    switch (this.loteSeleccionado.rotation) {
        case 0:
            this.offsetX = event.clientX - this.loteSeleccionado.x;
            this.offsetY = event.clientY - this.loteSeleccionado.y;
            break;
        case 90:
            this.offsetX = event.clientY - this.loteSeleccionado.x;
            this.offsetY = -(event.clientX - this.loteSeleccionado.y);
            break;
        case -180:
            this.offsetX = -(event.clientX - this.loteSeleccionado.x);
            this.offsetY = -(event.clientY - this.loteSeleccionado.y);
            break;
        default:
            this.offsetX = event.clientX - this.loteSeleccionado.x;
            this.offsetY = event.clientY - this.loteSeleccionado.y;
    }

    event.preventDefault(); // Evita que se seleccione texto al arrastrar
}

@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent): void {
    if (this.isDragging && this.loteSeleccionado) {
        let newX, newY;

        switch (this.loteSeleccionado.rotation) {
            case 0:
                newX = event.clientX - this.offsetX;
                newY = event.clientY - this.offsetY;
                break;
            case 90:
                newX = event.clientY - this.offsetX;
                newY = -(event.clientX - this.offsetY);
                break;
            case -180:
                newX = -(event.clientX - this.offsetX);
                newY = -(event.clientY - this.offsetY);
                break;
            default:
                newX = event.clientX - this.offsetX;
                newY = event.clientY - this.offsetY;
        }

        // Actualizar la posición del rectángulo y del texto
        this.loteSeleccionado.x = newX;
        this.loteSeleccionado.y = newY;
        this.loteSeleccionado.text_x = newX + 5;
        this.loteSeleccionado.text_y = newY + 5;

        console.log(`Mouse: (${event.clientX}, ${event.clientY})`);
        console.log(`Offset: (${this.offsetX}, ${this.offsetY})`);
        console.log(`Nuevo X: ${this.loteSeleccionado.x}, Nuevo Y: ${this.loteSeleccionado.y}`);
    }
}
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


  // Obtiene la clase para el color del lote
  getFillColor(loteId: number): string {
    // Solo el lote del difunto seleccionado debe resaltar
    return this.loteSeleccionado?.id === loteId ? 'cls-selected' : 'cls-default';
  }
  toggleLoteModal(type: 'add' | 'edit', state: boolean): void {
    if (type === 'add') {
      this.showAddLoteModal = state;
    } else {
      this.showEditLoteModal = state;
    }
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
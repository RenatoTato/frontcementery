export interface LoteOcupacion {
    id:number;
    blockName: number;
    typeblock:  'A' | 'B' | 'C' | 'D' | 'F' | 'G' | 'H' | 'J' | 'L' | 'M' | 'N' | 'S' | 'T';
    numbersblock:number;
    ocupadas: number;
    disponibles: number;
    limite: number;
    filas: number;
    columnas: number;
    x: number;
    y: number;
    rotation: number;
    text_x: number;
    text_y: number;
    trans_r_x?: number;
    trans_r_y?: number;
    trans_t_x: number;
    trans_t_y: number;
  }
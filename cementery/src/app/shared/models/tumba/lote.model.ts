export interface Lote {
  id?: number;  // ID del lote
  blockName: number;  // Bloque
  typeblock: string;  // Tipo de bloque
  numbersblock?: number;  // Número del bloque
  filas: number;  // Número de filas
  columnas: number;  // Número de columnas
  limite: number;  // Límite
  description: string;  // Descripción del lote
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
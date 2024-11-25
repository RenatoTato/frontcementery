export interface Lote {
  id?: number;  // ID del lote
  blockName: number;  // Bloque
  typeblock: string;  // Tipo de bloque
  numbersblock?: number;  // Número del bloque
  filas: number;  // Número de filas
  columnas: number;  // Número de columnas
  limite: number;  // Límite
  description: string;  // Descripción del lote
}
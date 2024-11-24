export interface Lote {
    id?: number;  // ID opcional, si es generado automáticamente por el backend
    blockName: number;  // Nombre del bloque (número)
    typeblock: string;  // Tipo de bloque
    numbersblock?: number;  // Número de tipo (opcional)
    filas: number;  // Número de filas
    columnas: number;  // Número de columnas
    limite: number;  // Límite de espacio
    description: string;  // Tipo de bloque
  }
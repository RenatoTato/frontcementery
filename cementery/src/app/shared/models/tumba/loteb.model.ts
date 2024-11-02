export interface LoteFilter {
    blockName?: number;         // Nombre del bloque
    typeblock?: string;         // Tipo de bloque (ej. "A")
    numbersblock?: number;      // Número del bloque
    filas?: number;             // Número de filas
    columnas?: number;          // Número de columnas
    limite?: number;            // Límite de ocupación del lote
}
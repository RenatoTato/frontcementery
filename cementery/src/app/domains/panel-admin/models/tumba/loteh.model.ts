export interface LoteHistory {
    history_id: number;         // ID de la versión en el historial
    history_user?: number | null; // Usuario que realizó el cambio
    id: number;                 // ID del lote
    loadDate: string;           // Fecha de creación
    updateDate: string;         // Fecha de última actualización
    description?: string;       // Descripción del lote
    blockName: number;          // Nombre del bloque
    typeblock: string;          // Tipo de bloque
    numbersblock: number;       // Número del bloque
    filas: number;              // Número de filas
    columnas: number;           // Número de columnas
    limite: number;             // Límite de ocupación
    history_date: string;       // Fecha de modificación en el historial
    history_change_reason?: string | null; // Razón del cambio
    history_type: '+' | '~' | '-'; // Tipo de cambio: creado, actualizado, eliminado
}

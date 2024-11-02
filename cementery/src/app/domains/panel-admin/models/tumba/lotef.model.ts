export interface LoteHistoryFilter {
    start_date?: string;       // Fecha de inicio del rango de historial (ISO)
    end_date?: string;         // Fecha de fin del rango de historial (ISO)
    entity_id?: number;        // ID de la entidad original (por ejemplo, el `id` de `Lote`)
    history_type?: string;     // Tipo de acción en el historial: "+" (creado), "~" (actualizado), "-" (eliminado)
    user?: number;             // ID del usuario que realizó el cambio
    blockName?: number;        // Nombre o número del bloque
    typeblock?: string;        // Tipo de bloque
    numbersblock?: number;     // Número de bloques
    filas?: number;            // Número de filas en el lote
    columnas?: number;         // Número de columnas en el lote
    limite?: number;           // Límite de ocupación del lote
    id?: number;               // ID específico del lote en la consulta
}

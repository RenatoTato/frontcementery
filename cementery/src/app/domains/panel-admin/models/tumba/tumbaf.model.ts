export interface TumbaHistoryFilter {
    start_date?: string;       // Fecha de inicio del rango de historial (ISO)
    end_date?: string;         // Fecha de fin del rango de historial (ISO)
    entity_id?: number;        // ID de la entidad original (por ejemplo, el `id` de `Tumba`)
    history_type?: '+' | '~' | '-';      // Tipo de acción en el historial: "+" (creado), "~" (actualizado), "-" (eliminado)
    user?: number;             // ID del usuario que realizó el cambio
    nicheNumber?: number;      // Número del nicho en la tumba
    nicheType?: string;        // Tipo de nicho
    available?: boolean;       // Disponibilidad de la tumba (true o false)
    nameLote?: number;         // ID o nombre del lote asociado
    id?: number;               // ID específico de la tumba en la consulta
}
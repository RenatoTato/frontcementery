export interface ServicioHistoryFilter {
    start_date?: string;       // Fecha de inicio del rango de historial (ISO)
    end_date?: string;         // Fecha de fin del rango de historial (ISO)
    entity_id?: number;        // ID de la entidad original (por ejemplo, el `id` de `Servicio`)
    history_type?: string;     // Tipo de acción en el historial: "+" (creado), "~" (actualizado), "-" (eliminado)
    user?: number;             // ID del usuario que realizó el cambio
    startDate?: string;        // Fecha de inicio del servicio (ISO)
    endDate?: string;          // Fecha de fin del servicio (ISO)
    ceremony?: string;         // Tipo de ceremonia (ej. "Cremacion", "Exhumacion")
    numberTomb?: number;       // Número de la tumba asociada
    deceased?: number;         // ID del difunto asociado al servicio
    id?: number;               // ID específico del servicio en la consulta
}

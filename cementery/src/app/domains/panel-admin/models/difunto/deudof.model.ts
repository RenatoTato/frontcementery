export interface DeudoHistoryFilter {
    start_date?: string;              // Fecha de inicio para el filtro de historial (formato ISO 8601)
    end_date?: string;                // Fecha de fin para el filtro de historial (formato ISO 8601)
    entity_id?: number;               // ID de la entidad específica (deudo)
    history_type?: '+' | '~' | '-';   // Tipo de cambio: "+" (creado), "~" (actualizado), "-" (eliminado)
    user?: number;                    // ID del usuario que realizó el cambio
    names?: string;                   // Nombre del deudo
    last_names?: string;              // Apellido del deudo
    idNumber?: string;                // Número de identificación o cédula del deudo
    phoneNumber?: string;             // Número de teléfono del deudo
    address?: string;                 // Dirección del deudo
    tipo?: 'Allegado' | 'Familiar' | 'Conocido';                    // Tipo de relación (ej. Allegado, Conocido, etc.)
    id?: number;                      // ID del registro del historial específico
}
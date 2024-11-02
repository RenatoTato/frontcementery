export interface TumbaHistory {
    history_id: number;         // ID de la versión específica del historial
    history_user?: number | null; // Usuario que realizó el cambio
    id: number;                 // ID de la tumba
    loadDate: string;           // Fecha de creación
    updateDate: string;         // Fecha de última actualización
    description?: string;       // Descripción de la tumba
    nicheNumber: number;        // Número de nicho
    nicheType: 'T' | 'E';          // Tipo de nicho
    available: boolean;         // Estado de disponibilidad
    history_date: string;       // Fecha de modificación en el historial
    history_change_reason?: string | null; // Razón del cambio
    history_type: '+' | '~' | '-'; // Tipo de cambio: creado, actualizado, eliminado
    nameLote: number;           // Nombre o ID del lote asociado
}
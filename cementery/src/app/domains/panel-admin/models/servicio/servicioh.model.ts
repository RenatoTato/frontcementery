export interface ServicioHistory {
    history_id: number;         // ID de la versión específica del historial
    history_user?: number | null; // Usuario que realizó el cambio
    id: number;                 // ID del servicio
    startDate: string;          // Fecha de inicio
    endDate: string;            // Fecha de fin
    ceremony: string;           // Tipo de ceremonia
    is_paid: boolean;           // Estado de pago
    amount_paid: string;        // Monto pagado
    payment_date: string;       // Fecha de pago
    loadDate: string;           // Fecha de creación
    updateDate: string;         // Fecha de última actualización
    description?: string | null; // Descripción del servicio
    history_date: string;       // Fecha de modificación en el historial
    history_change_reason?: string | null; // Razón del cambio
    history_type: '+' | '~' | '-'; // Tipo de cambio: creado, actualizado, eliminado
    numberTomb?: number | null; // Número de tumba asociada
    deceased: number;           // ID del difunto asociado
}

import { Difunto } from "@externo/models/difunto/difunto.model";

export interface ServicioHistory {
    history_id: number;         // ID de la versión específica del historial
    history_user?: string; // Usuario que realizó el cambio
    id: number;                 // ID del servicio
    startDate: string;          // Fecha de inicio
    endDate: string;            // Fecha de fin
    ceremony: 'Cremacion' | 'Inhumacion' | 'Exhumacion' | 'Conmemoracion' | 'Mantenimiento';  // Tipo de ceremonia
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
    deceased: Difunto;           // ID del difunto asociado
    deceasedName?: string; // Campo temporal
    numberTombDescription?: string; // Propiedad opcional para almacenar la descripción de la tumba

}

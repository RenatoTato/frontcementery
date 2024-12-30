export interface DifuntoHistory {
    history_user?: string;       // ID del usuario que realizó el cambio (null si desconocido)
    id: number;                  // ID del difunto en el historial
    names: string;               // Nombres del difunto en la versión histórica
    last_names: string;          // Apellidos del difunto en la versión histórica
    idNumber: string;            // Número de identificación o cédula
    requestNumber: string;       // Número de solicitud asociado al difunto
    deudo: number;               // ID del deudo asociado al difunto
    loadDate: string;            // Fecha de creación original del registro
    updateDate: string;          // Fecha de última actualización en el registro
    description?: string | null; // Descripción adicional (opcional)
    history_type: '+' | '~' | '-'; // Tipo de cambio
    history_date: string;        // Fecha de modificación histórica
    deudoDetails?: string;       // Nombre legible del deudo (calculado)
    historyTypeText?: string;    // Texto legible del tipo de cambio (calculado)
}

export interface DifuntoHistory {
    history_id: number;                    // ID único del historial
    history_user?: string;       // ID del usuario que realizó el cambio (null si desconocido)
    id: number;                            // ID del difunto en el historial
    names: string;                         // Nombres del difunto en la versión histórica
    last_names: string;                    // Apellidos del difunto en la versión histórica
    idNumber: string;                      // Número de identificación o cédula
    loadDate: string;                      // Fecha de creación original del registro
    updateDate: string;                    // Fecha de última actualización en el registro
    description?: string | null;           // Descripción adicional (opcional)
    requestNumber: string;                 // Número de solicitud asociado al difunto
    history_date: string;                  // Fecha de modificación histórica
    history_change_reason?: string | null; // Razón del cambio (opcional)
    history_type: '+' | '~' | '-';         // Tipo de cambio: "+" (creado), "~" (actualizado), "-" (eliminado)
    tumba: number;                         // ID de la tumba asociada al difunto
    deudo: number;                         // ID del deudo asociado al difunto
}
export interface DeudoHistory {
    history_id: number;               // ID único del historial de cambios
    history_user?: string;   // ID del usuario que realizó el cambio (null si es desconocido)
    id: number;                       // ID de la entidad original (en este caso, la entidad principal del historial)
    names: string;                    // Nombre del individuo o entidad en la versión histórica
    last_names: string;               // Apellidos del individuo o entidad en la versión histórica
    idNumber: string;                 // Número de identificación o cédula
    loadDate: string;                 // Fecha de creación o carga de la entidad original
    updateDate: string;               // Última fecha de actualización de la entidad original
    description?: string | null;      // Descripción adicional (opcional)
    phoneNumber: string;              // Número de teléfono
    email: string;                    // Correo electrónico
    address: string;                  // Dirección completa
    tipo:'Allegado' | 'Familiar' | 'Conocido';  // Tipo de relación o categoría
    history_date: string;             // Fecha de la modificación histórica
    history_change_reason?: string | null; // Razón del cambio (opcional)
    history_type: '+' | '~' | '-';    // Tipo de acción en el historial: "+" (creado), "~" (actualizado), "-" (eliminado)
}
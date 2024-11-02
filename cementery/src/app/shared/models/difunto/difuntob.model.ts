export interface DifuntoFilter {
    names?: string;             // Nombre del difunto
    last_names?: string;        // Apellido del difunto
    idNumber?: string;          // Número de identificación
    requestNumber?: string;     // Número de solicitud
    tumba?: number;             // ID de la tumba asociada
    deudo?: number;             // ID del deudo asociado
}
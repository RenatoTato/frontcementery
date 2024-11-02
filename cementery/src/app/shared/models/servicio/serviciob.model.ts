export interface ServicioFilter {
    startDate?: string;         // Fecha de inicio (ISO)
    endDate?: string;           // Fecha de fin (ISO)
    ceremony?: 'Cremacion' | 'Inhumacion' | 'Exhumacion' | 'Conmemoracion' | 'Mantenimiento';  // Tipo de ceremonia
    numberTomb?: number;        // Número de tumba asociada
    deceased?: number;          // ID del difunto asociado
}
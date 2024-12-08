export interface TumbaEstadoFilter { 
    nicheNumber?: number;          // Número del nicho
    nicheType?: 'T' | 'E';         // Tipo de nicho (ej. "T")
    available?: boolean;           // Estado de disponibilidad (true o false)
    nameLote?: number;             // Identificador del lote asociado
    nombre_difunto?: string;       // Nombre del difunto
    apellido_difunto?: string;     // Apellido del difunto
}
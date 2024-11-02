export interface TumbaFilter {
    nicheNumber?: number;       // Número del nicho
    nicheType?: 'T' | 'E';         // Tipo de nicho (ej. "T")
    available?: boolean;        // Estado de disponibilidad (true o false)
    nameLote?: number;          // Nombre o identificador del lote asociado
}
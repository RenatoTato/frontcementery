export interface EtapaFilter {
    stage_ceremony?: string;       // Tipo de ceremonia o etapa (por ejemplo, "Celebracion_vida")
    place?: string;                // Lugar de la ceremonia o etapa
    obituary?: number;             // ID del obituario asociado
    ceremony?: number;             // ID de la ceremonia asociada
}

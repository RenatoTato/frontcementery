import { Lote } from "./lote.model";

export interface Tumba {
    id?: number;  // ID opcional, si es generado automáticamente por el backend
    nicheNumber: number;  // Número de la tumba
    nicheType: 'T' | 'E';  // Tipo de nicho (Tumba de tierra o Tumba extramuros)
    available: boolean;  // Disponibilidad de la tumba
    nameLote: number | Lote ;  // ID del lote relacionado
    nameLote_ob: Lote | null;
    description: string;
    loteDetails: string;
  }
import { Difunto } from "../difunto/difunto.model";

export interface Obituario {
    id?: number;  // ID opcional, si es generado automáticamente por el backend
    obituary_detail: string;  // Detalle del obituario
    cementery?: string;  // Cementerio opcional
    place?: string;  // Lugar de la ceremonia opcional
    date?: Date;  // Fecha y hora de la ceremonia opcional
    name?: string;
    deceased: Difunto;  // ID del difunto (relación uno a uno)
  }
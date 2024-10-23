import { Servicio } from "../servicio/servicio.model";
import { Obituario } from "./obituario.model";

export interface EtapasObituario {
    id?: number;  // ID opcional, si es generado automáticamente por el backend
    stage_type: string;  // Tipo de etapa (Velación, Misa, etc.)
    place?: string;  // Lugar de la ceremonia (opcional)
    date?: Date;  // Fecha y hora de la ceremonia (opcional)
    obituary: Obituario;  // ID del obituario relacionado
    ceremony: Servicio;  // ID del servicio relacionado
  }
  
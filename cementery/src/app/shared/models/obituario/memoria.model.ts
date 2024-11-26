import { Obituario } from "./obituario.model";

export interface Memoria {
    id?: number;  // ID opcional, si es generado automáticamente por el backend
    names: string;  // Nombre del autor de la memoria
    relationship?: string;  // Relación con el difunto (opcional)
    text: string;  // Texto del recuerdo
    image?: string;  // URL de la imagen opcional (puede ser nulo)
    obituary: Obituario;  // ID del obituario relacionado
    obituarioDetails:string;
  }
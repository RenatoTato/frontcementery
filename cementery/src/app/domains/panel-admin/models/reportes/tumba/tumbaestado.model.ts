export interface TumbaEstado {
  nicheNumber: number;
  nicheType: string;
  available: boolean;
  difunto: DifuntoE | null;  // Puede ser null si no hay un difunto asignado
  servicio: ServicioE[];     // Puede contener varios servicios o estar vacío
}

export interface DifuntoE {
  names: string;
  last_names: string;
}

export interface ServicioE {
  startDate: string; // ISO 8601 date string
  endDate: string | null; // ISO 8601 date string or null
  ceremony: string;
}

// Interfaz para la respuesta completa de la API, incluyendo la paginación
export interface TumbaEstadoResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: TumbaEstado[];
}
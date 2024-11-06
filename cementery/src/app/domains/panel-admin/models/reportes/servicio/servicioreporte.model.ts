export interface ServicioReporte {
    ceremony: string;       // Tipo de ceremonia
    activos: number;        // Número de servicios activos
    completados: number;    // Número de servicios completados
    pendiente_pago: number; // Número de servicios pendientes de pago
  }
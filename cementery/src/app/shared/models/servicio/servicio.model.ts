
export interface Servicio {
    id?: number;  // ID opcional, si es generado automáticamente por el backend
    startDate: Date;  // Fecha de inicio
    endDate?: Date;  // Fecha de vencimiento opcional
    ceremony?: 'Cremacion' | 'Inhumacion' | 'Exhumacion' | 'Conmemoracion' | 'Mantenimiento';  // Tipo de ceremonia
    is_paid: boolean;  // Estado de pago
    amount_paid?: number;  // Monto pagado opcional
    payment_date?: Date;  // Fecha de pago opcional
    numberTomb?: number;  // ID de la tumba (opcional)
    deceased: number;  // ID del difunto
    difuntoDetails:string;
    tumbaDetails:string;
  }
export interface Social {
    id?: number;  // Opcional si el backend genera un ID automáticamente
    stage_type: string;  // Plataforma (Twitter, Facebook, Instagram, Youtube)
    url?: string;  // URL de la red social (opcional)
    iglesia?: number;  // ID de la iglesia relacionada
    loadDate?: Date;  // Fecha de creación autogenerada
    updateDate?: Date;  // Fecha de actualización autogenerada
  }
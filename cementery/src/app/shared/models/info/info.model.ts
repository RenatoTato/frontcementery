export interface Info {
    id?: number;  // Opcional si el backend genera un ID automáticamente
    category: string;
    title: string;
    description_short?: string;
    image?: string;  // Campo para la URL de la imagen
    description?: string;
    features: string;  // Características incluidas
    exclusions?: string;  // Exclusiones opcionales
    price?: number;  // Precio opcional
  }
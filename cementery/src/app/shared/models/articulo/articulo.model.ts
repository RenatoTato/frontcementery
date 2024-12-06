export interface Articulo {
    id: number;
    category:string;
    title: string;
    description: string;
    description_short: string;
    image?: string;  // Opcional si tiene una imagen
    references?: string;  // Opcional para referencias adicionales
    external_source?: string;  // Fuente externa opcional
    publication_date: string;  // Fecha de publicación
    author: string;
    is_featured: boolean;
  }
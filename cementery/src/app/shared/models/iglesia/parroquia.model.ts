export interface Parroquia {
    id?: number| undefined;  // Opcional si el backend genera un ID automáticamente
    name: string;  // Nombre de la parroquia
    churches_number: number;  // Número de iglesias
    image?: string;  // Campo para la URL de la imagen (opcional)
  }
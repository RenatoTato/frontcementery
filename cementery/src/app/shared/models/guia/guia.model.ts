export interface Guia {
    id?: number;  // El ID es opcional si no lo tienes en el frontend
    category: string;  // Categoría
    title: string;  // Título
    description_short?: string;  // Descripción breve, opcional
    image?: string;  // URL de la imagen, opcional
    description?: string;  // Observaciones, opcional
    steps?: string;  // Pasos a seguir, opcional
    aditional_resources?: string;  // URL de recursos adicionales, opcional
}
export interface ArticuloFilter {
    title?: string;                // Título del artículo
    author?: string;               // Autor del artículo
    is_featured?: boolean;         // Indicador de si el artículo es destacado
    publication_date?: string;     // Fecha de publicación (ISO)
    category?: string;             // Categoría del artículo
}

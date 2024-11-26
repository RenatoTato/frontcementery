import { Articulo } from "./articulo.model";

export interface Seccion {
    id: number;
    subtitle: string;
    content: string;
    article: Articulo;  // Relación con el artículo
    articuloDetails?: string;
  }
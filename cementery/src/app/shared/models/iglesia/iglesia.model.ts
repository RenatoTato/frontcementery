import { Parroquia } from "./parroquia.model";

export interface Iglesia {
    id?: number;  // Opcional si el backend genera un ID automáticamente
    name: string;  // Nombre de la iglesia
    address: string;  // Dirección (opcional)
    latitude?: number;  // Latitud (opcional)
    longitude?: number;  // Longitud (opcional)
    phone: string;  // Teléfono (opcional)
    email: string;  // Email (opcional)
    schedule: string;  // Horario (opcional)
    priest: string;  // Sacerdote (opcional)
    sector?: string;  // Sector (opcional)
    parish: Parroquia;  // ID de la Parroquia (relación con parroquia)
    image?: string;  // URL de la imagen de la iglesia (opcional)
  }
// Representa los cambios individuales en cada versión
export interface ChangeDetail {
    campo: string;                       // Nombre del campo que cambió
    antes?: string | number | boolean | null;   // Valor anterior del campo
    despues?: string | number | boolean | null; // Valor nuevo del campo
}

// Representa una versión de cambio específica en el historial
export interface VersionCambio {
    version_id: number;                  // ID de la versión en el historial
    fecha: string;                       // Fecha de la modificación
    cambios: ChangeDetail[];             // Lista de cambios en esta versión
}

// Representa el resultado completo con múltiples versiones
export interface HistorialCambios {
    cambios: VersionCambio[];            // Lista de versiones de cambios
}
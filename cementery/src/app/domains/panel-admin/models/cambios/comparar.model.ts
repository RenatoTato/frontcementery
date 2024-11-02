export interface ChangeDetail {
    campo: string;       // Nombre del campo que cambió
    antes: string;       // Valor anterior del campo
    despues: string;     // Valor nuevo del campo
}

export interface VersionCambio {
    version_id: number;           // ID de la versión en el historial
    fecha: string;                // Fecha de la modificación
    cambios: ChangeDetail[];      // Lista de cambios en esta versión
}


export interface DeudoFilter {
    names?: string;             // Nombre del deudo
    last_names?: string;        // Apellido del deudo
    idNumber?: string;          // Número de identificación (cédula)
    phoneNumber?: string;       // Número de teléfono
    address?: string;           // Dirección
    tipo?: 'Conocido' | 'Familiar' | 'Allegado' ;  // Tipo de ceremonia
}
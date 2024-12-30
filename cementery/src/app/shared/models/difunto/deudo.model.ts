export enum Relacion {
    Allegado = 'Allegado',
    Familiar = 'Familiar',
    Conocido = 'Conocido',
  }
export interface Deudo {
    id: number;
    names: string;
    last_names: string;
    idNumber: string;
    phoneNumber: string;
    email: string;
    address?: string;
    tipo?: Relacion;
    description?: string;
    formattedId?: string;      // Propiedad opcional
}
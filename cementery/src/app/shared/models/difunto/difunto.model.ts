import { Deudo } from "./deudo.model";
import { Tumba } from "../tumba/tumba.model";

export interface Difunto {
    id: number;
    names: string;
    last_names: string;
    idNumber: string;
    requestNumber: string;
    observaciones?: string;
    tumba?:number |Tumba;
    tumba_ob?:Tumba |null;
    deudo?:number |Deudo;
    deudo_ob?:Deudo| null;
    isEditing?: boolean;
    deudoDetails?:string;
    tumbaDetails?:string;
    formattedRequest?: string; // Propiedad opcional
    formattedId?: string;      // Propiedad opcional
}
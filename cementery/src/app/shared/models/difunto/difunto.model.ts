import { Deudo } from "./deudo.model";
import { Tumba } from "../tumba/tumba.model";

export interface Difunto {
    id: number;
    names: string;
    last_names: string;
    idNumber: string;
    requestNumber: string;
    observaciones?: string;
    tumba?:number;
    deudo:number;
}
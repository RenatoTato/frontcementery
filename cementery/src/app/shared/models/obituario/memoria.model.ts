import { Obituario } from "./obituario.model";

export interface Memoria {
  id?: number;
  names: string;
  relationship?: string;
  text: string;
  image?: string;
  obituary: number | Obituario; // Permite un número (ID) o el objeto completo
  description?:string;
  obituarioDetails?:string;
}
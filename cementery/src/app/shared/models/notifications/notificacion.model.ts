export interface Notificacion {
  id: number;
  name: string;
  contact_number: string;
  email?: string;
  area: string;
  message: string;
  is_attended: boolean;
  created_at: string;
  attended_at?: string;
  attended_by?: string;
}
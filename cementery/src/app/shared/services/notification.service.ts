import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Notification } from '@externo/models/notifications/notificacion.model';  // Ajusta la ruta según tu estructura
import { map } from 'rxjs/operators'; // Necesario para usar el operador `map`


@Injectable({
  providedIn: 'root'
})
export class NotificationService  {
  
  private apiUrl = 'http://127.0.0.1:8000/api/notificacion/'; // Cambia a tu URL real del backend

  constructor(private http: HttpClient) {}

  getNotifications(filters?: any): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}`, { params: filters });
  }
  
  getNotificationById(id: string): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrl}${id}/`);
  }
  getPendingCount(): Observable<number> {
    return this.http.get<Notification[]>(`${this.apiUrl}`, { params: { is_attended: false } })
      .pipe(
        map((notifications: Notification[]) => notifications.length) // Aquí TypeScript sabe el tipo
      );
  }
  markAsAttended(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}${id}/mark-as-attended/`, { });
  }
  // Método para enviar una notificación al backend mediante POST
  sendNotification(notification: {
    name: string;
    contact_number: string;
    email?: string;
    area: string;
    message: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, notification);
  }
}
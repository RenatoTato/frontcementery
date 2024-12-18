import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService  {
  private apiUrl = 'http://127.0.0.1:8000/api/notificacion/'; // Cambia a tu URL real del backend

  constructor(private http: HttpClient) {}

  // Método para obtener notificaciones no atendidas
  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Notificacion } from '@externo/models/notifications/notificacion.model';  // Ajusta la ruta según tu estructura
import { map } from 'rxjs/operators'; // Necesario para usar el operador `map`


@Injectable({
  providedIn: 'root'
})
export class NotificationService  {
  private notificationUrl = 'http://127.0.0.1:8000/api/notificacion/';

  constructor(private http: HttpClient) {}

  /**
   * Genera los parámetros dinámicamente a partir de los filtros proporcionados.
   * @param filterParams Filtros opcionales.
   * @returns HttpParams con los filtros.
   */
  private generateParams(filterParams?: any): HttpParams {
    let params = new HttpParams();

    if (filterParams) {
      for (const key in filterParams) {
        if (filterParams[key] !== null && filterParams[key] !== undefined) {
          params = params.set(key, filterParams[key]);
        }
      }
    }

    return params;
  }

  /**
   * Obtiene las notificaciones con o sin paginación y filtros.
   * @param page Número de la página (opcional).
   * @param pageSize Tamaño de la página (opcional).
   * @param filterParams Filtros opcionales.
   * @returns Observable con las notificaciones y metadatos.
   */
  getNotifications(
    page?: number,
    pageSize?: number,
    filterParams?: any
  ): Observable<{ results: Notificacion[]; count: number }> {
    let params = this.generateParams(filterParams);
  
    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }
  
    return this.http.get<{ results: Notificacion[]; count: number }>(this.notificationUrl, { params });
  }
  /**
   * Obtiene los detalles de una notificación por ID.
   * @param id ID de la notificación.
   * @returns Observable con la notificación.
   */
  getNotificationById(id: string): Observable<Notificacion> {
    return this.http.get<Notificacion>(`${this.notificationUrl}${id}/`);
  }

  /**
   * Marca una notificación como atendida.
   * @param id ID de la notificación.
   * @returns Observable con la respuesta del servidor.
   */
  markAsAttended(id: string): Observable<any> {
    return this.http.patch(`${this.notificationUrl}${id}/mark-as-attended/`, {});
  }

  /**
   * Envía una nueva notificación al backend.
   * @param notification Datos de la nueva notificación.
   * @returns Observable con la respuesta del servidor.
   */
  sendNotification(notification: {
    name: string;
    contact_number: string;
    email?: string;
    area: string;
    message: string;
  }): Observable<any> {
    return this.http.post(this.notificationUrl, notification);
  }
  getPendingCount(): Observable<number> {
    const params = this.generateParams({ is_attended: 'false' });
  
    return this.http.get<{ results: Notification[]; count: number }>(this.notificationUrl, { params })
      .pipe(
        map((response) => response.count) // Accede a la propiedad `count` si el backend es paginado
      );
  }
  
}

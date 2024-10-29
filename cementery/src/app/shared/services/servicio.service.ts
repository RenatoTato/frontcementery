import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '@externo/models/servicio/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private servicioUrl = 'http://127.0.0.1:8000/api/servicio/';
  constructor(private http: HttpClient) { }
  private generateParams(page?: number, pageSize?: number, filterParams?: any): HttpParams {
    let params = new HttpParams();

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    if (filterParams) {
      for (const key in filterParams) {
        if (filterParams[key]) {
          params = params.set(key, filterParams[key]);
        }
      }
    }

    return params;
  }

  // ============================
  // CRUD para Servicios
  // ============================

  // Método unificado para obtener Servicios, con o sin paginación y filtros
  getServicios(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Servicio[]; count: number } | Servicio[]> {
    const params = this.generateParams(page, pageSize, filterParams);
    console.log('GET request con parámetros:', params.toString()); // Verificación

    if (page == null || pageSize == null) {
      // Sin paginación
      return this.http.get<Servicio[]>(this.servicioUrl, { params });
    } else {
      // Con paginación
      return this.http.get<{ results: Servicio[]; count: number }>(this.servicioUrl, { params });
    }
  }
  // Obtener un artículo por ID
  getServicioId(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.servicioUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createServicio(data: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.servicioUrl, data)
  }
  // Actualizar un artículo existente
  updateServicio(id: number, data: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.servicioUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.servicioUrl}${id}/`)
  }

}

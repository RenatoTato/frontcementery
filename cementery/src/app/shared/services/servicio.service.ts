import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '@externo/models/servicio/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private servicioUrl = 'http://127.0.0.1:8000/api/servicio/';
  private servicioReadUrl = 'http://127.0.0.1:8000/api/servicioread/';


  constructor(private http: HttpClient) { }
  private generateParams(filterParams?: any): HttpParams {
    let params = new HttpParams();
  
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
  //Metodo get con paginacion
  getServicios(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Servicio[]; count: number } | Servicio[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Servicio[]; count: number } | Servicio[]>(this.servicioUrl, { params });
  }
  //Metodo get solo con filtros
  getReadServicios(filterParams?: any): Observable<Servicio[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Servicio[]>(this.servicioReadUrl, { params });
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

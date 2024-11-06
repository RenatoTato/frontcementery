import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '@externo/models/servicio/servicio.model';
import { ServicioFilter } from '@externo/models/servicio/serviciob.model';
import { ServicioDifunto } from '@admin/models/reportes/difunto/serviciod.mode';
import { ServicioReporte } from '@admin/models/reportes/servicio/servicioreporte.model';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private servicioUrl = 'http://127.0.0.1:8000/api/servicio/';
  private servicioReadUrl = 'http://127.0.0.1:8000/api/servicioread/';
  private reporteUrl = 'http://127.0.0.1:8000/api/servicio-reporte/';


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
  getServicios(page?: number, pageSize?: number, filterParams?: ServicioFilter): Observable<{ results: Servicio[]; count: number } | Servicio[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Servicio[]; count: number } | Servicio[]>(this.servicioUrl, { params });
  }
  //Metodo get solo con filtros
  getReadServicios(filterParams?: ServicioFilter): Observable<Servicio[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Servicio[]>(this.servicioReadUrl, { params });
  }
  getServicioDifunto(): Observable<ServicioDifunto[]> {
    return this.http.get<ServicioDifunto[]>(`${this.servicioUrl}difuntos-por-tipo-servicio/`);
  }
  getServicioReporte(): Observable<ServicioReporte[]> {
    return this.http.get<ServicioReporte[]>(this.reporteUrl);
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { Deudo } from '@externo/models/difunto/deudo.model';

@Injectable({
  providedIn: 'root'
})
export class DifuntoService {
  private difuntoUrl = 'http://127.0.0.1:8000/api/difunto/';
  private deudoUrl = 'http://127.0.0.1:8000/api/deudo/';
  constructor(private http: HttpClient) { }

  // ============================
  // CRUD para Difuntos
  // ============================

  // Obtener todos los artículos

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
  
  // Método unificado para obtener difuntos, con o sin paginación y filtros
  getDifuntos(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Difunto[]; count: number } | Difunto[]> {
    const params = this.generateParams(page, pageSize, filterParams);
    
    if (page == null || pageSize == null) {
      // Sin paginación
      return this.http.get<Difunto[]>(this.difuntoUrl, { params });
    } else {
      // Con paginación
      return this.http.get<{ results: Difunto[]; count: number }>(this.difuntoUrl, { params });
    }
  }
  // Obtener un artículo por ID
  getDifuntoId(id: number): Observable<Difunto> {
    return this.http.get<Difunto>(`${this.difuntoUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createDifunto(data: Difunto): Observable<Difunto> {
    return this.http.post<Difunto>(this.difuntoUrl, data)
  }
  // Actualizar un artículo existente
  updateDifunto(id: number, data: Difunto): Observable<Difunto> {
    return this.http.put<Difunto>(`${this.difuntoUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteDifunto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.difuntoUrl}${id}/`)
  }
  // ============================
  // CRUD para Deudos
  // ============================

  // Obtener todos los artículos
  getDeudos(): Observable<Deudo[]> {
    return this.http.get<Deudo[]>(this.deudoUrl)
  }
  // Obtener un artículo por ID
  getDeudoId(id: number): Observable<Deudo> {
    return this.http.get<Deudo>(`${this.deudoUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createDeudo(data: Deudo): Observable<Deudo> {
    return this.http.post<Deudo>(this.deudoUrl, data)
  }
  // Actualizar un artículo existente
  updateDeudo(id: number, data: Deudo): Observable<Deudo> {
    return this.http.put<Deudo>(`${this.deudoUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteDeudo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deudoUrl}${id}/`)
  }
}

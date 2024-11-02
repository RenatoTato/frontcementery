import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote } from '@externo/models/tumba/lote.model';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { LoteFilter } from '@externo/models/tumba/loteb.model';
import { TumbaFilter } from '@externo/models/tumba/tumbab.model';

@Injectable({
  providedIn: 'root'
})
export class TumbaService {
  private loteUrl = 'http://127.0.0.1:8000/api/lote/';
  private loteReadUrl = "http://127.0.0.1:8000/api/loteread/";
  private tumbaUrl = 'http://127.0.0.1:8000/api/tumba/';
  private tumbaReadUrl = "http://127.0.0.1:8000/api/tumbaread/";
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
  // CRUD para Lotes
  // ============================
  //Metodo get con paginacion
  getLotes(page?: number, pageSize?: number, filterParams?: LoteFilter): Observable<{ results: Lote[]; count: number } | Lote[]> {
    let params = this.generateParams(filterParams);
    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }
    return this.http.get<{ results: Lote[]; count: number } | Lote[]>(this.loteUrl, { params });
  }
  //Metodo get solo con filtros
  getReadLotes(filterParams?: LoteFilter): Observable<Lote[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Lote[]>(this.loteReadUrl, { params });
  }
  // Obtener un lote por ID
  getLoteId(id: number): Observable<Lote> {
    return this.http.get<Lote>(`${this.loteUrl}${id}/`)
  }
  // Crear un nuevo lote
  createLote(data: Lote): Observable<Lote> {
    return this.http.post<Lote>(this.loteUrl, data)
  }
  // Actualizar un lote existente
  updateLote(id: number, data: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${this.loteUrl}${id}/`, data)
  }
  // Eliminar un lote
  deleteLote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.loteUrl}${id}/`)
  }
  // ============================
  // CRUD para Tumbas
  // ============================
//Metodo get con paginacion
  getTumbas(page?: number, pageSize?: number, filterParams?: TumbaFilter): Observable<{ results: Tumba[]; count: number } | Tumba[]> {
    let params = this.generateParams(filterParams);
    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }
    return this.http.get<{ results: Tumba[]; count: number } | Tumba[]>(this.tumbaUrl, { params });
  }
  // Metodo con filtros
  getReadTumbas(filterParams?: TumbaFilter): Observable<Tumba[]> {
    const params = this.generateParams(filterParams);
    return this.http.get<Tumba[]>(this.tumbaReadUrl, { params });
  }
  // Obtener un tumba por ID
  getTumbaId(id: number): Observable<Tumba> {
    return this.http.get<Tumba>(`${this.tumbaUrl}${id}/`)
  }
  // Crear un nuevo tumba
  createTumba(data: Tumba): Observable<Tumba> {
    return this.http.post<Tumba>(this.tumbaUrl, data)
  }
  // Actualizar un tumba existente
  updateTumba(id: number, data: Tumba): Observable<Tumba> {
    return this.http.put<Tumba>(`${this.tumbaUrl}${id}/`, data)
  }
  // Eliminar un tumba
  deleteTumba(id: number): Observable<void> {
    return this.http.delete<void>(`${this.tumbaUrl}${id}/`)
  }
}
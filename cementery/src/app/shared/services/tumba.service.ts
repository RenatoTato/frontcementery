import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote } from '@externo/models/tumba/lote.model';
import { Tumba } from '@externo/models/tumba/tumba.model';

@Injectable({
  providedIn: 'root'
})
export class TumbaService {
  private loteUrl = 'http://127.0.0.1:8000/api/lote/';
  private loteGraficoUrl = "http://127.0.0.1:8000/api/grafilote/";
  private tumbaUrl = 'http://127.0.0.1:8000/api/tumba/';
  private tumbaGraficoUrl = "http://127.0.0.1:8000/api/grafitumba/";
  constructor(private http: HttpClient) { }

  // private generateParams(page?: number, pageSize?: number, filterParams?: any): HttpParams {
  //   let params = new HttpParams();

  //   if (page != null && pageSize != null) {
  //     params = params.set('page', page.toString()).set('page_size', pageSize.toString());
  //   }

  //   if (filterParams) {
  //     for (const key in filterParams) {
  //       if (filterParams[key]) {
  //         params = params.set(key, filterParams[key]);
  //       }
  //     }
  //   }

  //   return params;
  // }

  // ============================
  // CRUD para Lotes
  // ============================

  // Método unificado para obtener Lotes, con o sin paginación y filtros
  // getLotes(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Lote[]; count: number } | Lote[]> {
  //   const params = this.generateParams(page, pageSize, filterParams);
  //   console.log('GET request con parámetros:', params.toString()); // Verificación

  //   if (page == null || pageSize == null) {
  //     // Sin paginación
  //     return this.http.get<Lote[]>(this.loteUrl, { params });
  //   } else {
  //     // Con paginación
  //     return this.http.get<{ results: Lote[]; count: number }>(this.loteUrl, { params });
  //   }
  // }
  // Obtener un lote por ID

  getLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(this.loteUrl)
  }
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

  // Método unificado para obtener Tumbas, con o sin paginación y filtros
  // getGrafiTumbas(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Tumba[]; count: number } | Tumba[]> {
  //   const params = this.generateParams(page, pageSize, filterParams);
  //   console.log('GET request con parámetros:', params.toString()); // Verificación

  //   if (page == null || pageSize == null) {
  //     // Sin paginación
  //     return this.http.get<Tumba[]>(this.tumbaGraficoUrl, { params });
  //   } else {
  //     // Con paginación
  //     return this.http.get<{ results: Tumba[]; count: number }>(this.tumbaGraficoUrl, { params });
  //   }
  // }
  // Obtener un tumba por ID
  getTumbas(): Observable<Tumba[]> {
    return this.http.get<Tumba[]>(this.tumbaUrl)
  }
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
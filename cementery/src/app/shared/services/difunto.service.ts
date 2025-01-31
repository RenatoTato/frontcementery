import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { Deudo } from '@externo/models/difunto/deudo.model';
import { DifuntoFilter } from '@externo/models/difunto/difuntob.model';
import { DeudoFilter } from '@externo/models/difunto/deudob.model';


@Injectable({
  providedIn: 'root'
})
export class DifuntoService {
  private difuntoUrl = 'http://127.0.0.1:8000/api/difunto/';
  private difuntoReadUrl = 'http://127.0.0.1:8000/api/difuntoread/';
  private deudoUrl = 'http://127.0.0.1:8000/api/deudo/';
  private deudoReadUrl = 'http://127.0.0.1:8000/api/deudoread/';
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
  // CRUD para Difuntos
  // ============================

  // Método unificado para obtener difuntos, con o sin paginación y filtros
  //Metodo get con paginacion
  getDifuntos(page?: number, pageSize?: number, filterParams?: DifuntoFilter): Observable<{ results: Difunto[]; count: number } | Difunto[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Difunto[]; count: number } | Difunto[]>(this.difuntoUrl, { params });
  }
  //Metodo get solo con filtros
  getReadDifuntos(filterParams?: DifuntoFilter): Observable<Difunto[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Difunto[]>(this.difuntoReadUrl, { params });
  }
  // Obtener un difunto por ID
  getDifuntoId(id: number): Observable<Difunto> {
    return this.http.get<Difunto>(`${this.difuntoUrl}${id}/`)
  }
  // Crear un nuevo difunto
  createDifunto(data: Difunto): Observable<Difunto> {
    return this.http.post<Difunto>(this.difuntoUrl, data)
  }
  // Actualizar un difunto existente
  updateDifunto(id: number, data: Difunto): Observable<Difunto> {
    console.log(`Actualizando difunto con ID ${id} y datos:`, data);
    return this.http.put<Difunto>(`${this.difuntoUrl}${id}/`, data)
  }
  // Eliminar un difunto
  deleteDifunto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.difuntoUrl}${id}/`)
  }
  // ============================
  // CRUD para Deudos
  // ============================
  // Método unificado para obtener deudos, con o sin paginación y filtros
  //Metodo get con paginacion
  getDeudos(page?: number, pageSize?: number, filterParams?: DeudoFilter): Observable<{ results: Deudo[]; count: number } | Deudo[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Deudo[]; count: number } | Deudo[]>(this.deudoUrl, { params });
  }
  //Metodo get solo con filtros
  getReadDeudos(filterParams?: DeudoFilter): Observable<Deudo[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Deudo[]>(this.deudoReadUrl, { params });
  }
  // Obtener un deudo por ID
  getDeudoId(id: number): Observable<Deudo> {
    return this.http.get<Deudo>(`${this.deudoUrl}${id}/`)
  }
  // Crear un nuevo deudo
  createDeudo(data: Deudo): Observable<Deudo> {
    return this.http.post<Deudo>(this.deudoUrl, data)
  }
  // Actualizar un deudo existente
  updateDeudo(id: number, data: Deudo): Observable<Deudo> {
    return this.http.put<Deudo>(`${this.deudoUrl}${id}/`, data)
  }
  // Eliminar un deudo
  deleteDeudo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deudoUrl}${id}/`)
  }
}

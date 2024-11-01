import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Obituario } from '@externo/models/obituario/obituario.model';
import { EtapasObituario } from '@externo/models/obituario/etapas.model';
import { Memoria } from '@externo/models/obituario/memoria.model';

@Injectable({
  providedIn: 'root'
})
export class ObituarioService {

  private obituarioUrl = 'http://127.0.0.1:8000/api/obituario/';
  private obituarioReadUrl = 'http://127.0.0.1:8000/api/obituarioread/';
  private memoriaUrl = 'http://127.0.0.1:8000/api/memoria/';
  private memoriaReadUrl = 'http://127.0.0.1:8000/api/memoriaread/';
  private etapaUrl = 'http://127.0.0.1:8000/api/etapa/';
  private etapaReadUrl = 'http://127.0.0.1:8000/api/etaparead/';

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

  private buildFormDataMemoria(memoriaData: Memoria, file: File | null): FormData {
    const formData = new FormData();
    // Añadir los campos del modelo Iglesia al FormData
    formData.append('name', memoriaData.names);
    formData.append('text', memoriaData.text);
    formData.append('obituary', memoriaData.obituary.toString() || '');
    if (memoriaData.relationship) formData.append('relationship', memoriaData.relationship);
    // Añadir la imagen solo si se ha seleccionado una
    if (file) {
      formData.append('image', file, file.name);
    }
    return formData;
  }
  // ============================
  // CRUD para Obituarios
  // ============================
  // Método unificado para obtener Obituarios, con o sin paginación y filtros
  //Metodo get con paginacion
  getObituarios(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Obituario[]; count: number } | Obituario[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Obituario[]; count: number } | Obituario[]>(this.obituarioUrl, { params });
  }
  //Metodo get solo con filtros
  getReadObituarios(filterParams?: any): Observable<Obituario[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Obituario[]>(this.obituarioReadUrl, { params });
  }
  // Obtener un artículo por ID
  getObituarioId(id: number): Observable<Obituario> {
    return this.http.get<Obituario>(`${this.obituarioUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createObituario(data: Obituario): Observable<Obituario> {
    return this.http.post<Obituario>(this.obituarioUrl, data)
  }
  // Actualizar un artículo existente
  updateObituario(id: number, data: Obituario): Observable<Obituario> {
    return this.http.put<Obituario>(`${this.obituarioUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteObituario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.obituarioUrl}${id}/`)
  }
  // ============================
  // CRUD para Memorias
  // ============================
  // Método unificado para obtener Memorias, con o sin paginación y filtros
  //Metodo get con paginacion
  getMemorias(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Memoria[]; count: number } | Memoria[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Memoria[]; count: number } | Memoria[]>(this.memoriaUrl, { params });
  }
  //Metodo get solo con filtros
  getReadMemorias(filterParams?: any): Observable<Memoria[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Memoria[]>(this.memoriaReadUrl, { params });
  }
  // Obtener un artículo por ID
  getMemoriaId(id: number): Observable<Memoria> {
    return this.http.get<Memoria>(`${this.memoriaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createMemoria(memoriaData: Memoria, file: File | null): Observable<Memoria> {
    const formData = this.buildFormDataMemoria(memoriaData, file);
    return this.http.post<Memoria>(this.memoriaUrl, formData)
  }
  // Actualizar un artículo existente
  updateMemoria(id: number, memoriaData: Memoria, file: File | null): Observable<Memoria> {
    const formData = this.buildFormDataMemoria(memoriaData, file);
    return this.http.put<Memoria>(`${this.memoriaUrl}${id}/`, formData)
  }
  // Eliminar un artículo
  deleteMemoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.memoriaUrl}${id}/`)
  }
  // ============================
  // CRUD para Etapas
  // ============================
  // Método unificado para obtener Memorias, con o sin paginación y filtros
  //Metodo get con paginacion
  getEtapas(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: EtapasObituario[]; count: number } | EtapasObituario[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: EtapasObituario[]; count: number } | EtapasObituario[]>(this.etapaUrl, { params });
  }
  //Metodo get solo con filtros
  getReadEtapas(filterParams?: any): Observable<EtapasObituario[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<EtapasObituario[]>(this.etapaReadUrl, { params });
  }
  // Obtener un artículo por ID
  getEtapaId(id: number): Observable<EtapasObituario> {
    return this.http.get<EtapasObituario>(`${this.etapaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createEtapa(data: EtapasObituario): Observable<EtapasObituario> {
    return this.http.post<EtapasObituario>(this.etapaUrl, data)
  }
  // Actualizar un artículo existente
  updateEtapa(id: number, data: EtapasObituario): Observable<EtapasObituario> {
    return this.http.put<EtapasObituario>(`${this.etapaUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteEtapa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.etapaUrl}${id}/`)
  }
}
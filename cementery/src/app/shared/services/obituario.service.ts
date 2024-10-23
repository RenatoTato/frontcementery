import { HttpClient } from '@angular/common/http';
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
  private memoriaUrl = 'http://127.0.0.1:8000/api/memoria/';
  private etapaUrl = 'http://127.0.0.1:8000/api/etapa/';
  constructor(private http:HttpClient) { }

  // ============================
  // CRUD para Obituarios
  // ============================

  // Obtener todos los artículos
  getObituarios(): Observable<Obituario[]>{
    return this.http.get<Obituario[]>(this.obituarioUrl)
  }
  // Obtener un artículo por ID
  getObituarioId(id:number): Observable<Obituario>{
    return this.http.get<Obituario>(`${this.obituarioUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createObituario(data:Obituario): Observable<Obituario>{
    return this.http.post<Obituario>(this.obituarioUrl, data)
  }
  // Actualizar un artículo existente
  updateObituario(id:number, data:Obituario): Observable<Obituario>{
    return this.http.put<Obituario>(`${this.obituarioUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteObituario(id:number): Observable<void>{
    return this.http.delete<void>(`${this.obituarioUrl}${id}/`)
  }
  // ============================
  // CRUD para Memorias
  // ============================

  // Obtener todos los artículos
  getMemorias(): Observable<Memoria[]>{
    return this.http.get<Memoria[]>(this.memoriaUrl)
  }
  // Obtener un artículo por ID
  getMemoriaId(id:number): Observable<Memoria>{
    return this.http.get<Memoria>(`${this.memoriaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createMemoria(data:Memoria): Observable<Memoria>{
    return this.http.post<Memoria>(this.memoriaUrl, data)
  }
  // Actualizar un artículo existente
  updateMemoria(id:number, data:Memoria): Observable<Memoria>{
    return this.http.put<Memoria>(`${this.memoriaUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteMemoria(id:number): Observable<void>{
    return this.http.delete<void>(`${this.memoriaUrl}${id}/`)
  }
      // ============================
  // CRUD para Etapas
  // ============================

  // Obtener todos los artículos
  getEtapas(): Observable<EtapasObituario[]>{
    return this.http.get<EtapasObituario[]>(this.etapaUrl)
  }
  // Obtener un artículo por ID
  getEtapaId(id:number): Observable<EtapasObituario>{
    return this.http.get<EtapasObituario>(`${this.etapaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createEtapa(data:EtapasObituario): Observable<EtapasObituario>{
    return this.http.post<EtapasObituario>(this.etapaUrl, data)
  }
  // Actualizar un artículo existente
  updateEtapa(id:number, data:EtapasObituario): Observable<EtapasObituario>{
    return this.http.put<EtapasObituario>(`${this.etapaUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteEtapa(id:number): Observable<void>{
    return this.http.delete<void>(`${this.etapaUrl}${id}/`)
  }
}
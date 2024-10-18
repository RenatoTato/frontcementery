import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TumbaService {
  private loteUrl = 'http://127.0.0.1:8000/api/lote/';
  private tumbaUrl = 'http://127.0.0.1:8000/api/tumba/';
  constructor(private http:HttpClient) { }

  // ============================
  // CRUD para Lotes
  // ============================

  // Obtener todos los artículos
  getLote(): Observable<Lote[]>{
    return this.http.get<Lote[]>(this.loteUrl)
  }
  // Obtener un artículo por ID
  getLoteId(id:number): Observable<Lote>{
    return this.http.get<Lote>(`${this.loteUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createLote(data:Lote): Observable<Lote>{
    return this.http.post<Lote>(this.loteUrl, data)
  }
  // Actualizar un artículo existente
  updateLote(id:number, data:Lote): Observable<Lote>{
    return this.http.put<Lote>(`${this.loteUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteLote(id:number): Observable<void>{
    return this.http.delete<void>(`${this.loteUrl}${id}/`)
  }
  // ============================
  // CRUD para Tumbas
  // ============================

  // Obtener todos los artículos
  getTumba(): Observable<Tumba[]>{
    return this.http.get<Tumba[]>(this.tumbaUrl)
  }
  // Obtener un artículo por ID
  getTumbaId(id:number): Observable<Tumba>{
    return this.http.get<Tumba>(`${this.tumbaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createTumba(data:Tumba): Observable<Tumba>{
    return this.http.post<Tumba>(this.tumbaUrl, data)
  }
  // Actualizar un artículo existente
  updateTumba(id:number, data:Tumba): Observable<Tumba>{
    return this.http.put<Tumba>(`${this.tumbaUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteTumba(id:number): Observable<void>{
    return this.http.delete<void>(`${this.tumbaUrl}${id}/`)
  }

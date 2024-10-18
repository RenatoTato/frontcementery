import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { Seccion } from '@externo/models/articulo/seccion.model';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private articuloUrl = 'http://127.0.0.1:8000/api/articulo/';
  private seccionUrl = 'http://127.0.0.1:8000/api/seccion/';
  constructor(private http:HttpClient) { }

  // ============================
  // CRUD para Artículos
  // ============================

  // Obtener todos los artículos
  getArticulo(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.articuloUrl)
  }
  // Obtener un artículo por ID
  getArticuloId(id:number): Observable<Articulo>{
    return this.http.get<Articulo>(`${this.articuloUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createArticulo(data:Articulo): Observable<Articulo>{
    return this.http.post<Articulo>(this.articuloUrl, data)
  }
  // Actualizar un artículo existente
  updateArticulo(id:number, data:Articulo): Observable<Articulo>{
    return this.http.put<Articulo>(`${this.articuloUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteArticulo(id:number): Observable<void>{
    return this.http.delete<void>(`${this.articuloUrl}${id}/`)
  }
    // ============================
  // CRUD para Artículos
  // ============================

  // Obtener todos los artículos
  getSeccion(): Observable<Seccion[]>{
    return this.http.get<Seccion[]>(this.seccionUrl)
  }
  // Obtener un artículo por ID
  getSeccionId(id:number): Observable<Seccion>{
    return this.http.get<Seccion>(`${this.seccionUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createSeccion(data:Seccion): Observable<Seccion>{
    return this.http.post<Seccion>(this.seccionUrl, data)
  }
  // Actualizar un artículo existente
  updateSeccion(id:number, data:Seccion): Observable<Seccion>{
    return this.http.put<Seccion>(`${this.seccionUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteSeccion(id:number): Observable<void>{
    return this.http.delete<void>(`${this.seccionUrl}${id}/`)
  }
}

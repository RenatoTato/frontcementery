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
  private buildFormData(iglesiaData: Articulo, file: File | null): FormData {
    const formData = new FormData();

    // Añadir los campos del modelo Iglesia al FormData
    formData.append('name', iglesiaData.category);
    formData.append('address', iglesiaData.title);
    formData.append('phone', iglesiaData.description);
    formData.append('email', iglesiaData.publication_date);
    formData.append('schedule', iglesiaData.author);
    if (iglesiaData.references) formData.append('references', iglesiaData.references);
    if (iglesiaData.external_source) formData.append('external_source', iglesiaData.external_source.toString());

    // Añadir la imagen solo si se ha seleccionado una
    if (file) {
      formData.append('image', file, file.name);
    }

    return formData;
  }
  // Obtener todos los artículos
  getArticulos(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.articuloUrl)
  }
  // Obtener un artículo por ID
  getArticuloId(id:number): Observable<Articulo>{
    return this.http.get<Articulo>(`${this.articuloUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createArticulo(iglesiaData: Articulo, file: File | null): Observable<Articulo> {
    const formData = this.buildFormData(iglesiaData, file);
    return this.http.post<Articulo>(this.articuloUrl, formData)
  }
  // Actualizar un artículo existente
  updateArticulo(id: number, iglesiaData: Articulo, file: File | null): Observable<Articulo> {
    const formData = this.buildFormData(iglesiaData, file);
    return this.http.put<Articulo>(`${this.articuloUrl}${id}/`, formData)
  }
  // Eliminar un artículo
  deleteArticulo(id:number): Observable<void>{
    return this.http.delete<void>(`${this.articuloUrl}${id}/`)
  }
    // ============================
  // CRUD para Artículos
  // ============================

  // Obtener todos los artículos
  getSeccions(): Observable<Seccion[]>{
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

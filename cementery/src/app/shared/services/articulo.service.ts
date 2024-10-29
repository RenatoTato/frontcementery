import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  
  private buildFormDataArticulo(articuloData: Articulo, file: File | null): FormData {
    const formData = new FormData();
  
    // Añadir los campos correctos del modelo Articulo al FormData
    formData.append('category', articuloData.category);
    formData.append('title', articuloData.title);
    formData.append('description', articuloData.description);
    formData.append('author', articuloData.author);
  
    if (articuloData.references) formData.append('references', articuloData.references);
    if (articuloData.external_source) formData.append('external_source', articuloData.external_source);
  
    // Añadir la imagen solo si se ha seleccionado una
    if (file) {
      formData.append('image', file, file.name);
    }
  
    return formData;
  }
  // ============================
  // CRUD para Artículos
  // ============================

  // Método unificado para obtener Articulos, con o sin paginación y filtros
  getArticulos(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Articulo[]; count: number } | Articulo[]> {
    const params = this.generateParams(page, pageSize, filterParams);
    console.log('GET request con parámetros:', params.toString()); // Verificación

    if (page == null || pageSize == null) {
      // Sin paginación
      return this.http.get<Articulo[]>(this.articuloUrl, { params });
    } else {
      // Con paginación
      return this.http.get<{ results: Articulo[]; count: number }>(this.articuloUrl, { params });
    }
  }
  // Obtener un artículo por ID
  getArticuloId(id:number): Observable<Articulo>{
    return this.http.get<Articulo>(`${this.articuloUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createArticulo(articuloData: Articulo, file: File | null): Observable<Articulo> {
    const formData = this.buildFormDataArticulo(articuloData, file);
    return this.http.post<Articulo>(this.articuloUrl, formData)
  }
  // Actualizar un artículo existente
  updateArticulo(id: number, articuloData: Articulo, file: File | null): Observable<Articulo> {
    const formData = this.buildFormDataArticulo(articuloData, file);
    return this.http.put<Articulo>(`${this.articuloUrl}${id}/`, formData)
  }
  // Eliminar un artículo
  deleteArticulo(id:number): Observable<void>{
    return this.http.delete<void>(`${this.articuloUrl}${id}/`)
  }
    // ============================
  // CRUD para Artículos
  // ============================

  // Método unificado para obtener seccions, con o sin paginación y filtros
  getSeccions(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Seccion[]; count: number } | Seccion[]> {
    const params = this.generateParams(page, pageSize, filterParams);
    console.log('GET request con parámetros:', params.toString()); // Verificación

    if (page == null || pageSize == null) {
      // Sin paginación
      return this.http.get<Seccion[]>(this.seccionUrl, { params });
    } else {
      // Con paginación
      return this.http.get<{ results: Seccion[]; count: number }>(this.seccionUrl, { params });
    }
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

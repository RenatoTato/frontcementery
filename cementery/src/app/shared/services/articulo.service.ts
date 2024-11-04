import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '@externo/models/articulo/articulo.model';
import { Seccion } from '@externo/models/articulo/seccion.model';
import { ArticuloFilter } from '@externo/models/articulo/articulob.model';
import { SeccionFilter } from '@externo/models/articulo/seccionb.model';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private articuloUrl = 'http://127.0.0.1:8000/api/articulo/';
  private seccionUrl = 'http://127.0.0.1:8000/api/seccion/';
  private articuloReadUrl = 'http://127.0.0.1:8000/api/articuloread/';
  private seccionReadUrl = 'http://127.0.0.1:8000/api/seccionread/';
  constructor(private http:HttpClient) { }

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
  //Metodo get con paginacion
  getArticulos(page?: number, pageSize?: number, filterParams?: ArticuloFilter): Observable<{ results: Articulo[]; count: number } | Articulo[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Articulo[]; count: number } | Articulo[]>(this.articuloUrl, { params });
  }
  //Metodo get solo con filtros
  getReadArticulos(filterParams?: ArticuloFilter): Observable<Articulo[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Articulo[]>(this.articuloReadUrl, { params });
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

   //Metodo get con paginacion
   getSeccions(page?: number, pageSize?: number, filterParams?: SeccionFilter): Observable<{ results: Seccion[]; count: number } | Seccion[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Seccion[]; count: number } | Seccion[]>(this.seccionUrl, { params });
  }
  //Metodo get solo con filtros
  getReadSeccions(filterParams?: SeccionFilter): Observable<Seccion[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Seccion[]>(this.seccionReadUrl, { params });
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

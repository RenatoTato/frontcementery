import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Info } from '@externo/models/info/info.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private infoUrl = 'http://127.0.0.1:8000/api/info/';
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
  
  private buildFormData(infoData: Info, file: File | null): FormData {
    const formData = new FormData();

    // Añadir los campos del modelo Info al FormData
    formData.append('category', infoData.category);
    formData.append('title', infoData.title);
    formData.append('description_short', infoData.description_short || '');
    formData.append('description', infoData.description || '');
    formData.append('features', infoData.features);
    formData.append('exclusions', infoData.exclusions || '');

    // Añadir la imagen solo si se ha seleccionado una
    if (infoData.price) {
      formData.append('price', infoData.price.toString());
    }
    
    // Si se ha seleccionado una imagen, añadirla al FormData
    if (file) {
      formData.append('image', file, file.name);  // El segundo parámetro es opcional, puedes usar solo `file`
    }

    return formData;
  }
  // ============================
  // CRUD para Infos
  // ============================

  // Método unificado para obtener Infos, con o sin paginación y filtros
  getInfos(page?: number, pageSize?: number, filterParams?: any): Observable<{ results: Info[]; count: number } | Info[]> {
    const params = this.generateParams(page, pageSize, filterParams);
    console.log('GET request con parámetros:', params.toString()); // Verificación

    if (page == null || pageSize == null) {
      // Sin paginación
      return this.http.get<Info[]>(this.infoUrl, { params });
    } else {
      // Con paginación
      return this.http.get<{ results: Info[]; count: number }>(this.infoUrl, { params });
    }
  }
  // Obtener un artículo por ID
  getInfoId(id:number): Observable<Info>{
    return this.http.get<Info>(`${this.infoUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createInfo(infoData: Info, file: File | null): Observable<Info> {
    const formData = this.buildFormData(infoData, file);
    return this.http.post<Info>(this.infoUrl, formData)
  }
  // Actualizar un artículo existente
  updateInfo(id: number, infoData: Info, file: File | null): Observable<Info> {
    const formData = this.buildFormData(infoData, file);
    return this.http.put<Info>(`${this.infoUrl}${id}/`, formData)
  }
  // Eliminar un artículo
  deleteInfo(id:number): Observable<void>{
    return this.http.delete<void>(`${this.infoUrl}${id}/`)
  }
}

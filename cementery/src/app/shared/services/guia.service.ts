import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guia } from '@externo/models/guia/guia.model';
import { GuiaFilter } from '@externo/models/guia/guiab.model';


@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  private guiaUrl = 'http://127.0.0.1:8000/api/guia/';
  private guiaReadUrl= 'http://127.0.0.1:8000/api/guiaread/';
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

  private buildFormDataGuia(guiaData: Guia, file: File | null): FormData {
    const formData = new FormData();

    // Añadir los campos del modelo Iglesia al FormData
    formData.append('category', guiaData.category);
    formData.append('title', guiaData.title);
    if (guiaData.description_short) formData.append('description_short', guiaData.description_short);
    if (guiaData.description) formData.append('description', guiaData.description.toString());
    if (guiaData.steps) formData.append('steps', guiaData.steps.toString());
    if (guiaData.aditional_resources) formData.append('aditional_resources', guiaData.aditional_resources.toString());

    // Añadir la imagen solo si se ha seleccionado una
    if (file) {
      formData.append('image', file, file.name);
    }

    return formData;
  }
  // ============================
  // CRUD para Guias
  // ============================

  // Método unificado para obtener Guias, con o sin paginación y filtros
  //Metodo get con paginacion
  getGuias(page?: number, pageSize?: number, filterParams?: GuiaFilter): Observable<{ results: Guia[]; count: number } | Guia[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Guia[]; count: number } | Guia[]>(this.guiaUrl, { params });
  }
  //Metodo get solo con filtros
  getReadGuias(filterParams?: GuiaFilter): Observable<Guia[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Guia[]>(this.guiaReadUrl, { params });
  }
  
  // Obtener un artículo por ID
  getGuiaId(id:number): Observable<Guia>{
    return this.http.get<Guia>(`${this.guiaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createGuia(guiaData: Guia, file: File | null): Observable<Guia> {
    const formData = this.buildFormDataGuia(guiaData, file);
    return this.http.post<Guia>(this.guiaUrl, formData)
  }
  // Actualizar un artículo existente
  updateGuia(id: number, guiaData: Guia, file: File | null): Observable<Guia> {
    const formData = this.buildFormDataGuia(guiaData, file);
    return this.http.put<Guia>(`${this.guiaUrl}${id}/`, formData)
  }
  // Eliminar un artículo
  deleteGuia(id:number): Observable<void>{
    return this.http.delete<void>(`${this.guiaUrl}${id}/`)
  }
}

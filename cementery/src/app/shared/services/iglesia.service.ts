import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parroquia } from '@externo/models/iglesia/parroquia.model';
import { Iglesia } from '@externo/models/iglesia/iglesia.model';
import { Social } from '@externo/models/iglesia/social.model';
import { IglesiaFilter } from '@externo/models/iglesia/iglesiab.model';
import { ParroquiaFilter } from '@externo/models/iglesia/parroquiab.model';
import { SocialFilter } from '@externo/models/iglesia/socialb.model';

@Injectable({
  providedIn: 'root'
})
export class IglesiaService {

  private iglesiaUrl = 'http://127.0.0.1:8000/api/iglesia/';
  private iglesiaReadUrl = 'http://127.0.0.1:8000/api/iglesiaread/';
  private parroquiaUrl = 'http://127.0.0.1:8000/api/parroquia/';
  private parroquiaReadUrl = 'http://127.0.0.1:8000/api/parroquiaread/';
  private socialUrl = 'http://127.0.0.1:8000/api/social/';
  private socialReadUrl = 'http://127.0.0.1:8000/api/socialread/';
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
  
  private buildFormData(iglesiaData: Iglesia, file: File | null): FormData {
    const formData = new FormData();

    // Añadir los campos del modelo Iglesia al FormData
    formData.append('name', iglesiaData.name);
    formData.append('address', iglesiaData.address);
    formData.append('phone', iglesiaData.phone);
    formData.append('email', iglesiaData.email);
    formData.append('schedule', iglesiaData.schedule);
    formData.append('priest', iglesiaData.priest);
    if (iglesiaData.sector) formData.append('sector', iglesiaData.sector);
    if (iglesiaData.latitude) formData.append('latitude', iglesiaData.latitude.toString());
    if (iglesiaData.longitude) formData.append('longitude', iglesiaData.longitude.toString());
    formData.append('parish', iglesiaData.parish.toString());

    // Añadir la imagen solo si se ha seleccionado una
    if (file) {
      formData.append('image', file, file.name);
    }

    return formData;
  }
  private buildFormDataParroquia(parroquiaData: Parroquia, file: File | null): FormData {
    const formData = new FormData();

    // Añadir los campos del modelo Iglesia al FormData
    formData.append('name', parroquiaData.name);
    formData.append('address', parroquiaData.churches_number.toString() || '');
    // Añadir la imagen solo si se ha seleccionado una
    if (file) {
      formData.append('image', file, file.name);
    }

    return formData;
  }
  // ============================
  // CRUD para Iglesias
  // ============================

  // Método unificado para obtener Iglesias, con o sin paginación y filtros
  //Metodo get con paginacion
  getIglesias(page?: number, pageSize?: number, filterParams?: IglesiaFilter): Observable<{ results: Iglesia[]; count: number } | Iglesia[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Iglesia[]; count: number } | Iglesia[]>(this.iglesiaUrl, { params });
  }
  //Metodo get solo con filtros
  getReadIglesias(filterParams?: IglesiaFilter): Observable<Iglesia[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Iglesia[]>(this.iglesiaReadUrl, { params });
  }
  // Obtener un iglesia por ID
  getIglesiaId(id:number): Observable<Iglesia>{
    return this.http.get<Iglesia>(`${this.iglesiaUrl}${id}/`)
  }
  // Crear un nuevo iglesia
  createIglesia(iglesiaData: Iglesia, file: File | null): Observable<Iglesia> {
    const formData = this.buildFormData(iglesiaData, file);
    return this.http.post<Iglesia>(this.iglesiaUrl, formData)
  }
  // Actualizar un iglesia existente
  updateIglesia(id: number, iglesiaData: Iglesia, file: File | null): Observable<Iglesia> {
    const formData = this.buildFormData(iglesiaData, file);
    return this.http.put<Iglesia>(`${this.iglesiaUrl}${id}/`, formData)
  }
  // Eliminar un iglesia
  deleteIglesia(id:number): Observable<void>{
    return this.http.delete<void>(`${this.iglesiaUrl}${id}/`)
  }
  // ============================
  // CRUD para Parroquias
  // ============================

  // Obtener todos los parroquias
  // Método unificado para obtener Parroquias, con o sin paginación y filtros
  //Metodo get con paginacion
  getParroquias(page?: number, pageSize?: number, filterParams?: ParroquiaFilter): Observable<{ results: Parroquia[]; count: number } | Parroquia[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Parroquia[]; count: number } | Parroquia[]>(this.parroquiaUrl, { params });
  }
  //Metodo get solo con filtros
  getReadParroquias(filterParams?: ParroquiaFilter): Observable<Parroquia[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Parroquia[]>(this.parroquiaReadUrl, { params });
  }

  // Obtener un parroquia por ID
  getParroquiaId(id:number): Observable<Parroquia>{
    return this.http.get<Parroquia>(`${this.parroquiaUrl}${id}/`)
  }
  // Crear un nuevo parroquia
  createParroquia(parroquiaData: Parroquia, file: File | null): Observable<Parroquia> {
    const formData = this.buildFormDataParroquia(parroquiaData, file);
    return this.http.post<Parroquia>(this.parroquiaUrl, formData)
  }
  // Actualizar un parroquia existente
  updateParroquia(id: number, parroquiaData: Parroquia, file: File | null): Observable<Parroquia> {
    const formData = this.buildFormDataParroquia(parroquiaData, file);
    return this.http.put<Parroquia>(`${this.parroquiaUrl}${id}/`, formData)
  }
  // Eliminar un parroquia
  deleteParroquia(id:number): Observable<void>{
    return this.http.delete<void>(`${this.parroquiaUrl}${id}/`)
  }
      
  // ============================
  // CRUD para Socials
  // ============================

  // Obtener todos los socials
  //Metodo get con paginacion
  getSocials(page?: number, pageSize?: number, filterParams?: SocialFilter): Observable<{ results: Social[]; count: number } | Social[]> {
    let params = this.generateParams(filterParams);

    if (page != null && pageSize != null) {
      params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    }

    return this.http.get<{ results: Social[]; count: number } | Social[]>(this.socialUrl, { params });
  }
  //Metodo get solo con filtros
  getReadSocials(filterParams?: SocialFilter): Observable<Social[]> {
    let params = this.generateParams(filterParams);
    return this.http.get<Social[]>(this.socialReadUrl, { params });
  }

  // Obtener un social por ID
  getSocialId(id:number): Observable<Social>{
    return this.http.get<Social>(`${this.socialUrl}${id}/`)
  }
  // Crear un nuevo social
  createSocial(data:Social): Observable<Social>{
    return this.http.post<Social>(this.socialUrl, data)
  }
  // Actualizar un social existente
  updateSocial(id:number, data:Social): Observable<Social>{
    return this.http.put<Social>(`${this.socialUrl}${id}/`, data)
  }
  // Eliminar un social
  deleteSocial(id:number): Observable<void>{
    return this.http.delete<void>(`${this.socialUrl}${id}/`)
  }
}

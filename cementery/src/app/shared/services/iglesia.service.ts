import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parroquia } from '@externo/models/iglesia/parroquia.model';
import { Iglesia } from '@externo/models/iglesia/iglesia.model';
import { Social } from '@externo/models/iglesia/social.model';

@Injectable({
  providedIn: 'root'
})
export class IglesiaService {

  private iglesiaUrl = 'http://127.0.0.1:8000/api/iglesia/';
  private parroquiaUrl = 'http://127.0.0.1:8000/api/parroquia/';
  private socialUrl = 'http://127.0.0.1:8000/api/social/';
  constructor(private http:HttpClient) { }

  // ============================
  // CRUD para Iglesias
  // ============================
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
  // Obtener todos los artículos
  getIglesias(): Observable<Iglesia[]>{
    return this.http.get<Iglesia[]>(this.iglesiaUrl)
  }
  // Obtener un artículo por ID
  getIglesiaId(id:number): Observable<Iglesia>{
    return this.http.get<Iglesia>(`${this.iglesiaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createIglesia(iglesiaData: Iglesia, file: File | null): Observable<Iglesia> {
    const formData = this.buildFormData(iglesiaData, file);
    return this.http.post<Iglesia>(this.iglesiaUrl, formData)
  }
  // Actualizar un artículo existente
  updateIglesia(id: number, iglesiaData: Iglesia, file: File | null): Observable<Iglesia> {
    const formData = this.buildFormData(iglesiaData, file);
    return this.http.put<Iglesia>(`${this.iglesiaUrl}${id}/`, formData)
  }
  // Eliminar un artículo
  deleteIglesia(id:number): Observable<void>{
    return this.http.delete<void>(`${this.iglesiaUrl}${id}/`)
  }
  // ============================
  // CRUD para Parroquias
  // ============================

  // Obtener todos los artículos
  getParroquias(): Observable<Parroquia[]>{
    return this.http.get<Parroquia[]>(this.parroquiaUrl)
  }
  // Obtener un artículo por ID
  getParroquiaId(id:number): Observable<Parroquia>{
    return this.http.get<Parroquia>(`${this.parroquiaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createParroquia(parroquiaData: Parroquia, file: File | null): Observable<Parroquia> {
    const formData = this.buildFormDataParroquia(parroquiaData, file);
    return this.http.post<Parroquia>(this.parroquiaUrl, formData)
  }
  // Actualizar un artículo existente
  updateParroquia(id: number, parroquiaData: Parroquia, file: File | null): Observable<Parroquia> {
    const formData = this.buildFormDataParroquia(parroquiaData, file);
    return this.http.put<Parroquia>(`${this.parroquiaUrl}${id}/`, formData)
  }
  // Eliminar un artículo
  deleteParroquia(id:number): Observable<void>{
    return this.http.delete<void>(`${this.parroquiaUrl}${id}/`)
  }
      
  // ============================
  // CRUD para Socials
  // ============================

  // Obtener todos los artículos
  getSocials(): Observable<Social[]>{
    return this.http.get<Social[]>(this.socialUrl)
  }
  // Obtener un artículo por ID
  getSocialId(id:number): Observable<Social>{
    return this.http.get<Social>(`${this.socialUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createSocial(data:Social): Observable<Social>{
    return this.http.post<Social>(this.socialUrl, data)
  }
  // Actualizar un artículo existente
  updateSocial(id:number, data:Social): Observable<Social>{
    return this.http.put<Social>(`${this.socialUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteSocial(id:number): Observable<void>{
    return this.http.delete<void>(`${this.socialUrl}${id}/`)
  }
}

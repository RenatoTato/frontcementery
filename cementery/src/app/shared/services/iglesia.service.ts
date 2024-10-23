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

  // Obtener todos los artículos
  getIglesias(): Observable<Iglesia[]>{
    return this.http.get<Iglesia[]>(this.iglesiaUrl)
  }
  // Obtener un artículo por ID
  getIglesiaId(id:number): Observable<Iglesia>{
    return this.http.get<Iglesia>(`${this.iglesiaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createIglesia(data:Iglesia): Observable<Iglesia>{
    return this.http.post<Iglesia>(this.iglesiaUrl, data)
  }
  // Actualizar un artículo existente
  updateIglesia(id:number, data:Iglesia): Observable<Iglesia>{
    return this.http.put<Iglesia>(`${this.iglesiaUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteIglesia(id:number): Observable<void>{
    return this.http.delete<void>(`${this.iglesiaUrl}${id}/`)
  }
  // ============================
  // CRUD para Parroquias
  // ============================

  // Obtener todos los artículos
  getParroquia(): Observable<Parroquia[]>{
    return this.http.get<Parroquia[]>(this.parroquiaUrl)
  }
  // Obtener un artículo por ID
  getParroquiaId(id:number): Observable<Parroquia>{
    return this.http.get<Parroquia>(`${this.parroquiaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createParroquia(data:Parroquia): Observable<Parroquia>{
    return this.http.post<Parroquia>(this.parroquiaUrl, data)
  }
  // Actualizar un artículo existente
  updateParroquia(id:number, data:Parroquia): Observable<Parroquia>{
    return this.http.put<Parroquia>(`${this.parroquiaUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteParroquia(id:number): Observable<void>{
    return this.http.delete<void>(`${this.parroquiaUrl}${id}/`)
  }
      // ============================
  // CRUD para Socials
  // ============================

  // Obtener todos los artículos
  getSocial(): Observable<Social[]>{
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

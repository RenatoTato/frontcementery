import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuiaService {

  private guiaUrl = 'http://127.0.0.1:8000/api/guia/';
   constructor(private http:HttpClient) { }

  // ============================
  // CRUD para Guias
  // ============================

  // Obtener todos los artículos
  getGuia(): Observable<Guia[]>{
    return this.http.get<Guia[]>(this.guiaUrl)
  }
  // Obtener un artículo por ID
  getGuiaId(id:number): Observable<Guia>{
    return this.http.get<Guia>(`${this.guiaUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createGuia(data:Guia): Observable<Guia>{
    return this.http.post<Guia>(this.guiaUrl, data)
  }
  // Actualizar un artículo existente
  updateGuia(id:number, data:Guia): Observable<Guia>{
    return this.http.put<Guia>(`${this.guiaUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteGuia(id:number): Observable<void>{
    return this.http.delete<void>(`${this.guiaUrl}${id}/`)
  }
}

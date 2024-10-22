import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Info } from '@externo/models/info/info.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private infoUrl = 'http://127.0.0.1:8000/api/info/';
   constructor(private http:HttpClient) { }

  // ============================
  // CRUD para Infos
  // ============================

  // Obtener todos los artículos
  getInfo(): Observable<Info[]>{
    return this.http.get<Info[]>(this.infoUrl)
  }
  // Obtener un artículo por ID
  getInfoId(id:number): Observable<Info>{
    return this.http.get<Info>(`${this.infoUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createInfo(data:Info): Observable<Info>{
    return this.http.post<Info>(this.infoUrl, data)
  }
  // Actualizar un artículo existente
  updateInfo(id:number, data:Info): Observable<Info>{
    return this.http.put<Info>(`${this.infoUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteInfo(id:number): Observable<void>{
    return this.http.delete<void>(`${this.infoUrl}${id}/`)
  }
}

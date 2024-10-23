import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '@externo/models/servicio/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private servicioUrl = 'http://127.0.0.1:8000/api/servicio/';
  constructor(private http:HttpClient) { }

  // ============================
  // CRUD para Servicios
  // ============================

  // Obtener todos los artículos
  getServicios(): Observable<Servicio[]>{
    return this.http.get<Servicio[]>(this.servicioUrl)
  }
  // Obtener un artículo por ID
  getServicioId(id:number): Observable<Servicio>{
    return this.http.get<Servicio>(`${this.servicioUrl}${id}/`)
  }
  // Crear un nuevo artículo
  createServicio(data:Servicio): Observable<Servicio>{
    return this.http.post<Servicio>(this.servicioUrl, data)
  }
  // Actualizar un artículo existente
  updateServicio(id:number, data:Servicio): Observable<Servicio>{
    return this.http.put<Servicio>(`${this.servicioUrl}${id}/`, data)
  }
  // Eliminar un artículo
  deleteServicio(id:number): Observable<void>{
    return this.http.delete<void>(`${this.servicioUrl}${id}/`)
  }

}

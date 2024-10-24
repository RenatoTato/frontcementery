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

  // Obtener todos los artículos
  getInfo(): Observable<Info[]>{
    return this.http.get<Info[]>(this.infoUrl)
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

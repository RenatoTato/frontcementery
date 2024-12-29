import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialCambios } from '@admin/models/cambios/comparar.model';
import { ResponseRestaurar } from '@admin/models/cambios/restaurar.model';


@Injectable({
  providedIn: 'root'
})
export class ServicioHistoryService {

  constructor(private http: HttpClient) { }


  private buildFilterParams(filters: Record<string, any>): HttpParams {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }
  getHistorials<T>(
    entity: string,
    page: number = 1,
    pageSize: number = 10,
    filters: Record<string, any> = {}
  ): Observable<{ results: T[]; count: number; next?: string; previous?: string }> {
    let params = this.buildFilterParams(filters);
    params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    return this.http.get<{ results: T[]; count: number; next?: string; previous?: string }>(
      `http://127.0.0.1:8000/api/${entity}-history/`, { params });
  }
  
  compareVersions<T>(
    entity: string,
    objectId: number,
    attribute: string = 'all',
    limit: number = 5
  ): Observable<HistorialCambios> {
    const params = new HttpParams()
      .set('object_id', objectId.toString())
      .set('limit', limit.toString())
      .set('attribute', attribute);
    return this.http.get<HistorialCambios>(`http://127.0.0.1:8000/api/${entity}-history/comparar/`, { params });
  }
  
  restoreVersion(
    entity: string,
    versionId: number
  ): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`http://127.0.0.1:8000/api/${entity}-history/restaurar/`, { version_id: versionId });
  }
}

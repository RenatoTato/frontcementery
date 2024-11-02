import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { ResponseRestaurar } from '@admin/models/cambios/restaurar.model';
import { ServicioHistory } from '@admin/models/servicio/servicioh.model';
import { ServicioHistoryFilter } from '@admin/models/servicio/serviciof.model';
@Injectable({
  providedIn: 'root'
})
export class ServicioHistoryService {

  private servicioHistorialUrl = `http://127.0.0.1:8000/api/servicio-history/`;


  constructor(private http: HttpClient) { }

  private buildHttpParams(objectId: number, limit: number, attribute?: string): HttpParams {
    let params = new HttpParams()
      .set('object_id', objectId.toString())
      .set('limit', limit.toString());

    if (attribute) {
      params = params.set('attribute', attribute);
    }

    return params;
  }

  private buildFilterParams(filters: Record<string, any>): HttpParams {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }
  // ============================
  // Historial para Lotes
  // ============================
  getLoteHistorials(filters: ServicioHistoryFilter): Observable<ServicioHistory[]> {
    const params = this.buildFilterParams(filters);
    return this.http.get<ServicioHistory[]>(`${this.servicioHistorialUrl}`, { params });
  }

  // Obtener historial con filtros
  getLoteHistorial(objectId: number, limit: number = 5): Observable<ServicioHistory[]> {
    const params = this.buildHttpParams(objectId, limit);
    return this.http.get<ServicioHistory[]>(`${this.servicioHistorialUrl}historial/`, { params });
  }

  // Comparar varias versiones consecutivas de un objeto
  compareLoteVersions(objectId: number, attribute: string = 'all', limit: number = 5): Observable<VersionCambio[]> {
    const params = this.buildHttpParams(objectId, limit, attribute);
    return this.http.get<VersionCambio[]>(`${this.servicioHistorialUrl}comparar/`, { params });
  }

  // Restaurar una versión anterior
  restoreLoteVersion(versionId: number): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`${this.servicioHistorialUrl}restaurar/`, { version_id: versionId });
  }
}

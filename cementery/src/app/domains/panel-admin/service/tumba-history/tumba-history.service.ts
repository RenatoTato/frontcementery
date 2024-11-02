import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VersionCambio } from '@admin/models/cambios/comparar.model';
import { ResponseRestaurar } from '@admin/models/cambios/restaurar.model';
import { TumbaHistory } from '@admin/models/tumba/tumbah.model';
import { LoteHistory } from '@admin/models/tumba/loteh.model';
import { TumbaHistoryFilter } from '@admin/models/tumba/tumbaf.model';
import { LoteHistoryFilter } from '@admin/models/tumba/lotef.model';

@Injectable({
  providedIn: 'root'
})
export class TumbaHistoryService {
  private loteHistorialUrl = `http://127.0.0.1:8000/api/lote-history/`;
  private tumbaHistorialUrl = `http://127.0.0.1:8000/api/tumba-history/`;

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
  getLoteHistorials(filters: LoteHistoryFilter): Observable<LoteHistory[]> {
    const params = this.buildFilterParams(filters);
    return this.http.get<LoteHistory[]>(`${this.loteHistorialUrl}`, { params });
  }

  // Obtener historial con filtros
  getLoteHistorial(objectId: number, limit: number = 5): Observable<LoteHistory[]> {
    const params = this.buildHttpParams(objectId, limit);
    return this.http.get<LoteHistory[]>(`${this.loteHistorialUrl}historial/`, { params });
  }

  // Comparar varias versiones consecutivas de un objeto
  compareLoteVersions(objectId: number, attribute: string = 'all', limit: number = 5): Observable<VersionCambio[]> {
    const params = this.buildHttpParams(objectId, limit, attribute);
    return this.http.get<VersionCambio[]>(`${this.loteHistorialUrl}comparar/`, { params });
  }

  // Restaurar una versión anterior
  restoreLoteVersion(versionId: number): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`${this.loteHistorialUrl}restaurar/`, { version_id: versionId });
  }

  // ============================
  // Historial para Tumbas
  // ============================
  getTumbaHistorials(filters: TumbaHistoryFilter): Observable<TumbaHistory[]> {
    const params = this.buildFilterParams(filters);
    return this.http.get<TumbaHistory[]>(`${this.tumbaHistorialUrl}`, { params });
  }

  // Obtener historial con filtros
  getTumbaHistorial(objectId: number, limit: number = 5): Observable<TumbaHistory[]> {
    const params = this.buildHttpParams(objectId, limit);
    return this.http.get<TumbaHistory[]>(`${this.tumbaHistorialUrl}historial/`, { params });
  }

  // Comparar varias versiones consecutivas de un objeto
  compareTumbaVersions(objectId: number, attribute: string = 'all', limit: number = 5): Observable<VersionCambio[]> {
    const params = this.buildHttpParams(objectId, limit, attribute);
    return this.http.get<VersionCambio[]>(`${this.tumbaHistorialUrl}comparar/`, { params });
  }

  // Restaurar una versión anterior
  restoreTumbaVersion(versionId: number): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`${this.tumbaHistorialUrl}restaurar/`, { version_id: versionId });
  }
}


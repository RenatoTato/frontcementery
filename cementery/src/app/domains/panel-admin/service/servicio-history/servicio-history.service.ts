import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistorialCambios } from '@admin/models/cambios/comparar.model';
import { ResponseRestaurar } from '@admin/models/cambios/restaurar.model';
import { ServicioHistory } from '@admin/models/servicio/servicioh.model';
import { ServicioHistoryFilter } from '@admin/models/servicio/serviciof.model';
import { DifuntoHistoryFilter } from '@admin/models/difunto/difuntof.model';
import { DifuntoHistory } from '@admin/models/difunto/difuntoh.model';
import { DeudoHistory } from '@admin/models/difunto/deudoh.model';
import { DeudoHistoryFilter } from '@admin/models/difunto/deudof.model';
import { TumbaHistory } from '@admin/models/tumba/tumbah.model';
import { LoteHistory } from '@admin/models/tumba/loteh.model';
import { TumbaHistoryFilter } from '@admin/models/tumba/tumbaf.model';
import { LoteHistoryFilter } from '@admin/models/tumba/lotef.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioHistoryService {
  private difuntoHistorialUrl = `http://127.0.0.1:8000/api/difunto-history/`;
  private deudoHistorialUrl = `http://127.0.0.1:8000/api/deudo-history/`;
  private servicioHistorialUrl = `http://127.0.0.1:8000/api/servicio-history/`;
  private loteHistorialUrl = `http://127.0.0.1:8000/api/lote-history/`;
  private tumbaHistorialUrl = `http://127.0.0.1:8000/api/tumba-history/`;

  constructor(private http: HttpClient) { }

  private buildHttpParams(object_id: number, limit: number, attribute?: string): HttpParams {
    let params = new HttpParams()
      .set('object_id', object_id.toString())
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
  // Historial para Sercicios
  // ============================
  getServicioHistorials(page: number = 1, pageSize: number = 10, filters: ServicioHistoryFilter = {}): Observable<{ results: ServicioHistory[]; count: number; next?: string; previous?: string }> {
    let params = this.buildFilterParams(filters);
    params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    return this.http.get<{ results: ServicioHistory[]; count: number; next?: string; previous?: string }>(`${this.servicioHistorialUrl}`, { params });
  }

  // Obtener historial con filtros
  getServicioHistorial(objectId: number, limit: number = 5): Observable<ServicioHistory[]> {
    const params = this.buildHttpParams(objectId, limit);
    return this.http.get<ServicioHistory[]>(`${this.servicioHistorialUrl}historial/`, { params });
  }

  // Comparar varias versiones consecutivas de un objeto
  compareServicioVersions(objectId: number, attribute: string = 'all', limit: number = 5): Observable<HistorialCambios> {
    const params = new HttpParams()
      .set('object_id', objectId.toString())
      .set('limit', limit.toString())
      .set('attribute', attribute);
    return this.http.get<HistorialCambios>(`${this.servicioHistorialUrl}comparar/`, { params });
  }

  // Restaurar una versión anterior
  restoreServicioVersion(versionId: number): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`${this.servicioHistorialUrl}restaurar/`, { version_id: versionId });
  }
  // ============================
  // Historial para Difuntos
  // ============================
  getDifuntoHistorials(page: number = 1, pageSize: number = 10, filters: DifuntoHistoryFilter = {}): Observable<{ results: DifuntoHistory[]; count: number; next?: string; previous?: string }> {
    let params = this.buildFilterParams(filters);
    params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    return this.http.get<{ results: DifuntoHistory[]; count: number; next?: string; previous?: string }>(`${this.difuntoHistorialUrl}`, { params });
  }

  // Obtener historial con filtros
  getDifuntoHistorial(objectId: number, limit: number = 5): Observable<DifuntoHistory[]> {
    const params = this.buildHttpParams(objectId, limit);
    return this.http.get<DifuntoHistory[]>(`${this.difuntoHistorialUrl}historial/`, { params });
  }

  // Comparar varias versiones consecutivas de un objeto
  compareDifuntoVersions(objectId: number, attribute: string = 'all', limit: number = 5): Observable<HistorialCambios> {
    const params = new HttpParams()
      .set('object_id', objectId.toString())
      .set('limit', limit.toString())
      .set('attribute', attribute);
    return this.http.get<HistorialCambios>(`${this.difuntoHistorialUrl}comparar/`, { params });
  }

  // Restaurar una versión anterior
  restoreDifuntoVersion(versionId: number): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`${this.difuntoHistorialUrl}restaurar/`, { version_id: versionId });
  }

  // ============================
  // Historial para Deudos
  // ============================
  getDeudoHistorials(page: number = 1, pageSize: number = 10, filters: DeudoHistoryFilter = {}): Observable<{ results: DeudoHistory[]; count: number; next?: string; previous?: string }> {
    let params = this.buildFilterParams(filters);
    params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    return this.http.get<{ results: DeudoHistory[]; count: number; next?: string; previous?: string }>(`${this.deudoHistorialUrl}`, { params });
  }

  // Obtener historial con filtros
  getDeudoHistorial(objectId: number, limit: number = 5): Observable<DeudoHistory[]> {
    const params = this.buildHttpParams(objectId, limit);
    return this.http.get<DeudoHistory[]>(`${this.deudoHistorialUrl}historial/`, { params });
  }

  // Comparar varias versiones consecutivas de un objeto
  compareDeudoVersions(objectId: number, attribute: string = 'all', limit: number = 5): Observable<HistorialCambios> {
    const params = new HttpParams()
      .set('object_id', objectId.toString())
      .set('limit', limit.toString())
      .set('attribute', attribute);
    return this.http.get<HistorialCambios>(`${this.deudoHistorialUrl}comparar/`, { params });
  }

  // Restaurar una versión anterior
  restoreDeudoVersion(versionId: number): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`${this.deudoHistorialUrl}restaurar/`, { version_id: versionId });
  }
    // ============================
  // Historial para Lotes
  // ============================
  getLoteHistorials(page: number = 1, pageSize: number = 10, filters: LoteHistoryFilter = {}): Observable<{ results: LoteHistory[]; count: number; next?: string; previous?: string }> {
    let params = this.buildFilterParams(filters);
    params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    return this.http.get<{ results: LoteHistory[]; count: number; next?: string; previous?: string }>(`${this.loteHistorialUrl}`, { params });
  }

  // Obtener historial con filtros
  getLoteHistorial(objectId: number, limit: number = 5): Observable<LoteHistory[]> {
    const params = this.buildHttpParams(objectId, limit);
    return this.http.get<LoteHistory[]>(`${this.loteHistorialUrl}historial/`, { params });
  }

  // Comparar varias versiones consecutivas de un objeto
  compareLoteVersions(objectId: number, attribute: string = 'all', limit: number = 5): Observable<HistorialCambios> {
    const params = new HttpParams()
      .set('object_id', objectId.toString())
      .set('limit', limit.toString())
      .set('attribute', attribute);
    return this.http.get<HistorialCambios>(`${this.loteHistorialUrl}comparar/`, { params });
  }

  // Restaurar una versión anterior
  restoreLoteVersion(versionId: number): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`${this.loteHistorialUrl}restaurar/`, { version_id: versionId });
  }

  // ============================
  // Historial para Tumbas
  // ============================
  getTumbaHistorials(page: number = 1, pageSize: number = 10, filters: TumbaHistoryFilter = {}): Observable<{ results: TumbaHistory[]; count: number; next?: string; previous?: string }> {
    let params = this.buildFilterParams(filters);
    params = params.set('page', page.toString()).set('page_size', pageSize.toString());
    return this.http.get<{ results: TumbaHistory[]; count: number; next?: string; previous?: string }>(`${this.tumbaHistorialUrl}`, { params });
  }

  // Obtener historial con filtros
  getTumbaHistorial(objectId: number, limit: number = 5): Observable<TumbaHistory[]> {
    const params = this.buildHttpParams(objectId, limit);
    return this.http.get<TumbaHistory[]>(`${this.tumbaHistorialUrl}historial/`, { params });
  }

  // Comparar varias versiones consecutivas de un objeto
  compareTumbaVersions(objectId: number, attribute: string = 'all', limit: number = 5): Observable<HistorialCambios> {
    const params = new HttpParams()
      .set('object_id', objectId.toString())
      .set('limit', limit.toString())
      .set('attribute', attribute);
    return this.http.get<HistorialCambios>(`${this.tumbaHistorialUrl}comparar/`, { params });
  }

  // Restaurar una versión anterior
  restoreTumbaVersion(versionId: number): Observable<ResponseRestaurar> {
    return this.http.post<ResponseRestaurar>(`${this.tumbaHistorialUrl}restaurar/`, { version_id: versionId });
  }
}

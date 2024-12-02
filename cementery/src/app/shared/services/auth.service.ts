import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@externo/models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = 'http://127.0.0.1:8000/api/token/'; // Ruta para obtener el token
  private refreshUrl = 'http://127.0.0.1:8000/api/token/refresh/'; // Ruta para refrescar el token

  
  constructor(private http:HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.tokenUrl, { username, password });
  }

  // Método para refrescar el token de acceso
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post(this.refreshUrl, { refresh: refreshToken });
  }

  // Método para eliminar el token del localStorage (logout)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  // Método opcional para obtener el perfil del usuario (si tienes este endpoint en el backend)
  getProfile(): Observable<User> {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http.get<User>('http://127.0.0.1:8000/api/profile/', {
        headers: { Authorization: `Bearer ${token}` } // Incluye el token de acceso en el encabezado de la solicitud
      });
    }
    return new Observable(observer => {
      observer.error('No token available');
    });
  }
  decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
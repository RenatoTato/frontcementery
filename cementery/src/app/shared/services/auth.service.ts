import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '@externo/models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenUrl = 'http://127.0.0.1:8000/api/auth/token/'; // Ruta para obtener el token
  private refreshUrl = 'http://127.0.0.1:8000/api/auth/token/refresh/'; // Ruta para refrescar el token

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.tokenUrl, { username, password }).pipe(
      tap(response => {
        this.storeTokens(response.access, response.refresh); // Almacenar tokens
        this.storeUserInfo(response.access); // Decodificar y almacenar información adicional
      })
    );
  }

  // Método para refrescar el token
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<any>(this.refreshUrl, { refresh: refreshToken }).pipe(
      tap(response => {
        localStorage.setItem('token', response.access);
        this.storeUserInfo(response.access); // Actualizar información del usuario
      })
    );
  }

  // Método para eliminar los tokens y la información del usuario (logout)
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
  }

  // Método para almacenar los tokens
  private storeTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // Método para decodificar y almacenar información adicional del usuario
  private storeUserInfo(token: string): void {
    const decodedToken = this.decodeToken(token);
    console.log('Decoded Token:', decodedToken); // Depurar el token decodificado
    if (decodedToken) {
      localStorage.setItem('first_name', decodedToken.first_name || '');
      localStorage.setItem('last_name', decodedToken.last_name || '');
      localStorage.setItem('email', decodedToken.email || ''); // Guardar email
      localStorage.setItem('roles', JSON.stringify(decodedToken.roles || []));
    }
  }

  // Método para obtener información del usuario
  getUserInfo(): { first_name: string; last_name: string; email: string; roles: string[] } {
    return {
      first_name: localStorage.getItem('first_name') || '', // Recupera el nombre
      last_name: localStorage.getItem('last_name') || '',   // Recupera el apellido
      email: localStorage.getItem('email') || '',           // Recupera el email
      roles: JSON.parse(localStorage.getItem('roles') || '[]'), // Recupera los roles
    };
  }
  // Método para decodificar un token JWT
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
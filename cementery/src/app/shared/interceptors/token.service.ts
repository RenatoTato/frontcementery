import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Clonamos la solicitud y añadimos el token en la cabecera Authorization
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Si el token ha expirado, intentamos renovarlo
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              localStorage.setItem('token', response.access); // Guardar el nuevo token de acceso
              const clonedRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${response.access}` }
              });
              return next.handle(clonedRequest); // Repetir la solicitud con el nuevo token
            })
          );
        }
        return throwError(error); // Si hay otro error, lo lanzamos
      })
    );
  }
}

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el router para redirigir si no es válido

  const user = authService.getUserInfo(); // Obtén la información del usuario desde el servicio

  if (user.roles.includes('Administrador')) {
    return true; // Permitir acceso si el usuario es administrador
  } else {
    router.navigate(['/']); // Redirigir al inicio si no tiene permisos
    return false; // Denegar acceso
  }
};
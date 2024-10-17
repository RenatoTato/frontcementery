import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';  // Importar HTTP_INTERCEPTORS
import { routes } from './app.routes';
import { TokenInterceptor } from './shared/interceptors/token.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,  // Permitir múltiples interceptores si es necesario
  },
  importProvidersFrom(FormsModule)  // Asegúrate de incluir FormsModule aquí también
]};
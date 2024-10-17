import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,  // Mantenemos los proveedores existentes de appConfig
    importProvidersFrom(FormsModule)  // Añadimos FormsModule como proveedor aquí
  ]
})
  .catch((err) => console.error(err));
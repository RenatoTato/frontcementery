import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DifuntoService } from '@externo/services/difunto.service'; // Asegúrate de que la ruta sea correcta
import { Deudo } from '@externo/models/difunto/deudo.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private difuntoService: DifuntoService) { } // Inyectamos el servicio DifuntoService
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { // Cambia 'es-ES' al idioma deseado
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  formatRequestNumber(requestNumber: number): string {
    const formattedNumber = requestNumber.toString().padStart(8, '0');
    return `S${formattedNumber}`;
  }
  // Comparar versiones
  formatIdNumber(requestNumber: number): string {
    const formattedNumber = requestNumber.toString().padStart(10, '0');
    return `${formattedNumber}`;
  }
  mapHistoryType(type: string | undefined): string {
    const typeMap: { [key: string]: string } = {
      '+': 'Creación',
      '~': 'Actualización',
      '-': 'Eliminación'
    };
    return type ? typeMap[type] || 'Desconocido' : 'Desconocido';
  }

  mapUser(userId: string | undefined): string {
    console.log('userId recibido:', userId);
    const userMap: { [key: string]: string } = {
      'renato': 'Renato',
      'pricila': 'Priscila Rodríguez',
      'deudo': 'Fernando Abdón',
      'liviston': 'Livingston Olivares',
      'tato': 'Tato Dany'
    };
    return userId ? userMap[userId] || userId : 'Desconocido';
  }
  mapCeremony(ceremony: string | undefined): string {
    const ceremonyrMap: { [key: string]: string } = {
      'Cremacion': 'Cremación',
      'Inhumacion': 'Inhumación',
      'Exhumacion': 'Exhumación',
      'Conmemoracion': 'Conmemoración',
      'Mantenimiento': 'Mantenimiento',
    };
    return ceremony ? ceremonyrMap[ceremony] || ceremony : 'Desconocido';
  }
  getDeudoDetails(deudoId: number): Observable<string> {
    return this.difuntoService.getDeudoId(deudoId).pipe(
      map((deudo: Deudo) => `${deudo.names} ${deudo.last_names}`),
      catchError((error) => {
        console.error(`Error al obtener el nombre del deudo con ID ${deudoId}:`, error);
        return of('Información no disponible');
      })
    );
  }


}

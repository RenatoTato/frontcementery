import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private userMap: { [key: string]: string } = {
    'renato': 'Renato',
    'pricila': 'Priscila Rodríguez',
    'deudo': 'Fernando Abdón',
    'liviston': 'Livingston Olivares',
    'tato': 'Tato Dany'
  };

  private historyTypeMap: { [key: string]: string } = {
    '+': 'Creación',
    '~': 'Actualización',
    '-': 'Eliminación'
  };

  private ceremonyMap:{ [key: string]: string } = {
    'Cremacion': 'Cremación',
    'Inhumacion': 'Inhumación',
    'Exhumacion': 'Exhumación',
    'Conmemoracion': 'Conmemoración',
    'Mantenimiento': 'Mantenimiento'
  };

  mapUser(userId: string | undefined): string {
    return userId ? this.userMap[userId] || userId : 'Desconocido';
  }

  mapHistoryType(type: string): string {
    return this.historyTypeMap[type] || type;
  }

  mapCeremony(ceremony:string):string{
    return this.ceremonyMap[ceremony] || ceremony;
  }
}

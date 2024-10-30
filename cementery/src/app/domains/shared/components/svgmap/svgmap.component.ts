import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { TumbaService } from '@externo/services/tumba.service';
import { DifuntoService } from '@externo/services/difunto.service';
import { Tumba } from '@externo/models/tumba/tumba.model';
import { Difunto } from '@externo/models/difunto/difunto.model';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-svgmap',
  standalone: true,
  imports: [],
  templateUrl: './svgmap.component.html',
  styleUrl: './svgmap.component.css'
})
export class SvgmapComponent {
//   tumbas: Tumba[][] = []; // El grid de tumbas

//   constructor(private tumbaService: TumbaService) {}

//   ngOnInit(): void {}

//   // Método llamado al hacer clic en un bloque
//   onBlockClick(loteId: number): void {
//     console.log(`Lote seleccionado: ${loteId}`);

//     // Usa el método existente `getGrafiTumbas` con el filtro `nameLote`
//     const filterParams = { nameLote: loteId.toString() };

//     this.tumbaService.getGrafiTumbas(undefined, undefined, filterParams).subscribe((response) => {
//       const tumbas = 'results' in response ? response.results : response;
//       this.tumbas = this.createGrid(tumbas); // Crear el grid de tumbas
//     });
//   }

//   // Crear un grid de tumbas basado en las filas y columnas del lote
//   createGrid(tumbas: Tumba[]): Tumba[][] {
//     const rows: Tumba[][] = []; // Define el tipo explícito de `rows` como `Tumba[][]`
    
//     // Lógica para dividir las tumbas en filas y columnas
//     const numColumns = 5; // Ejemplo: ajusta el número de columnas según sea necesario
//     for (let i = 0; i < tumbas.length; i += numColumns) {
//       rows.push(tumbas.slice(i, i + numColumns));
//     }
  
//     return rows;
//   }
}
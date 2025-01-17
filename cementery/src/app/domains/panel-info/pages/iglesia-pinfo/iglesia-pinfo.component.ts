import { Component, OnInit } from '@angular/core';
import { Iglesia } from '@externo/models/iglesia/iglesia.model';
import { IglrsiasInfosComponent } from "../../component/iglrsias-infos/iglrsias-infos.component";
import { ActivatedRoute, Router } from '@angular/router';
import { IglesiaService } from '@externo/services/iglesia.service';
import { Parroquia } from '@externo/models/iglesia/parroquia.model';
import { CommonModule } from '@angular/common';
import { IglesiaFilter } from '@externo/models/iglesia/iglesiab.model';

@Component({
  selector: 'app-iglesia-pinfo',
  standalone: true,
  imports: [CommonModule, IglrsiasInfosComponent],
  templateUrl: './iglesia-pinfo.component.html',
  styleUrl: './iglesia-pinfo.component.css'
})
export class IglesiaPinfoComponent implements OnInit {
  iglesias: Iglesia[] = [];
  iglesiaSeleccionada: Iglesia | null = null;
  filteredIglesias: Iglesia[] = [];
  parroquias: Parroquia[] = [];
  filtro: IglesiaFilter = {}; // Objeto para aplicar filtros

  constructor(private iglesiaService: IglesiaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Recuperar el ID desde la URL y cargar el detalle de la iglesia
    this.route.params.subscribe((params) => {
      const id = params['id'] ? +params['id'] : null; // Convierte a número si existe
      if (id) {
        this.verIglesia(id); // Carga el detalle de la iglesia
      } else {
        this.cargarIglesias(); // Carga la lista de iglesias si no hay ID en la URL
      }
    });
    this.cargarParroquias();
  }

  verIglesia(id: number): void {
    // Navega a la URL correspondiente y carga el detalle
    this.router.navigate(['/iglesias', id]); // Cambia la URL
    this.iglesiaService.getIglesiaId(id).subscribe((iglesia) => {
      this.iglesiaSeleccionada = iglesia; // Selecciona la iglesia
    });
  }

  cargarIglesias(): void {
    this.iglesiaService.getReadIglesias(this.filtro).subscribe((iglesias) => {
      this.iglesias = iglesias;
      this.filteredIglesias = iglesias;
    });
  }

  cargarParroquias(): void {
    this.iglesiaService.getReadParroquias().subscribe((parroquias) => {
      this.parroquias = parroquias;
    });
  }

  onSearchInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.filtro.name = input;
    this.aplicarFiltros();
  }


  aplicarFiltros(): void {
    this.cargarIglesias(); // Recarga las iglesias aplicando el filtro
  }
  onParroquiaFilterChange(event: Event, parroquiaId: number | undefined | null): void {
    this.filtro.parish = parroquiaId || undefined; // Asigna el ID de la parroquia o lo limpia
    this.aplicarFiltros();
  }
 

  volverALista(): void {
    this.iglesiaSeleccionada = null; // Limpia la selección para volver a la lista
    this.router.navigate(['/iglesias']);
  }
}
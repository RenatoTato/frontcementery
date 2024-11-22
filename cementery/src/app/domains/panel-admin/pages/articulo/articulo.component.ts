import { Component } from '@angular/core';
import { ArticuloFormComponent } from '@admin/components/articulos/articuloForm/articuloForm.component';
import { SeccionFormComponent } from "@admin/components/articulos/seccionForm/seccionForm.component";
import { ArticuloEditarComponent } from "../../components/articulos/articulo-editar/articulo-editar.component";
import { SeccionEditarComponent } from "../../components/articulos/seccion-editar/seccion-editar.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [ArticuloFormComponent, SeccionFormComponent, ArticuloEditarComponent, SeccionEditarComponent, CommonModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent {
  // Estado actual del componente
  estadoActual: 'formularioSeccion' | 'formularioArticulo' | 'edicionArticulo' | 'edicionSeccion' = 'formularioSeccion';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'formularioSeccion' | 'formularioArticulo' | 'edicionArticulo' | 'edicionSeccion' ): void {
    this.estadoActual = nuevoEstado;
  }

  // Métodos de conveniencia
  mostrarFormularioSeccion(): void {
    this.cambiarEstado('formularioSeccion');
  }

  mostrarFormularioArticulo(): void {
    this.cambiarEstado('formularioArticulo');
  }

  mostrarEdicionArticulo(): void {
    this.cambiarEstado('edicionArticulo');
  }

  mostrarEdicionSeccion(): void {
    this.cambiarEstado('edicionSeccion');
  }
}
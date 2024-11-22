import { Component } from '@angular/core';
import { IglesiaFormComponent } from "@admin/components/iglesias/iglesiaForm/iglesiaForm.component";
import { ParroquiaFormComponent } from "@admin/components/iglesias/parroquiaForm/parroquiaForm.component";
import { SocialFormComponent } from '@admin/components/iglesias/socialForm/socialForm.component';
import { SocialEditarComponent } from "../../components/iglesias/social-editar/social-editar.component";
import { ParroquiaEditarComponent } from "../../components/iglesias/parroquia-editar/parroquia-editar.component";
import { IglesiaEditarComponent } from "../../components/iglesias/iglesia-editar/iglesia-editar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iglesia',
  standalone: true,
  imports: [IglesiaFormComponent, ParroquiaFormComponent, SocialEditarComponent, ParroquiaEditarComponent, IglesiaEditarComponent, CommonModule, SocialFormComponent],
  templateUrl: './iglesia.component.html',
  styleUrl: './iglesia.component.css'
})
export class IglesiaComponent {
  // Estado actual del componente
  estadoActual: 'formularioIglesia' | 'formularioParroquia' | 'edicionParroquia' | 'edicionIglesia' | 'formularioRedes'| 'edicionRedes'= 'formularioIglesia';

  // Método genérico para cambiar el estado
  cambiarEstado(nuevoEstado: 'formularioIglesia' | 'formularioParroquia' | 'edicionParroquia' | 'edicionIglesia' | 'formularioRedes'|'edicionRedes'): void {
    this.estadoActual = nuevoEstado;
  }

  // Métodos de conveniencia
  mostrarFormularioIglesia(): void {
    this.cambiarEstado('formularioIglesia');
  }

  mostrarFormularioParroquia(): void {
    this.cambiarEstado('formularioParroquia');
  }

  mostrarEdicionParroquia(): void {
    this.cambiarEstado('edicionParroquia');
  }

  mostrarEdicionIglesia(): void {
    this.cambiarEstado('edicionIglesia');
  }

  mostrarFormularioRedes(): void {
    this.cambiarEstado('formularioRedes');
  }

  mostrarEdicionRedes(): void {
    this.cambiarEstado('edicionRedes');
  }
}

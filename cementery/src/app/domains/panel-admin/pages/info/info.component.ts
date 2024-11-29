import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IglesiaFormComponent } from "@admin/components/iglesias/iglesiaForm/iglesiaForm.component";
import { ParroquiaFormComponent } from "@admin/components/iglesias/parroquiaForm/parroquiaForm.component";
import { ParroquiaEditarComponent } from "@admin/components/iglesias/parroquia-editar/parroquia-editar.component";
import { IglesiaEditarComponent } from "@admin/components/iglesias/iglesia-editar/iglesia-editar.component";
import { SocialFormComponent } from "@admin/components/iglesias/socialForm/socialForm.component";
import { SocialEditarComponent } from "@admin/components/iglesias/social-editar/social-editar.component";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, IglesiaFormComponent, ParroquiaFormComponent, ParroquiaEditarComponent, IglesiaEditarComponent, SocialFormComponent, SocialEditarComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
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


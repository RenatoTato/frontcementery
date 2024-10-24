import { Component } from '@angular/core';
import { ServicioFormComponent } from "@admin/components/servicios/servicio/servicioForm.component";

@Component({
  selector: 'app-servicio-dashboard',
  standalone: true,
  imports: [ServicioFormComponent],
  templateUrl: './servicio-dashboard.component.html',
  styleUrl: './servicio-dashboard.component.css'
})
export class ServicioDashboardComponent {

}

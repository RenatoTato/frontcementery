import { Component } from '@angular/core';
import { ArticuloInfoComponent } from "../../component/articulo-info/articulo-info.component";

@Component({
  selector: 'app-info-dashboard',
  standalone: true,
  imports: [ArticuloInfoComponent],
  templateUrl: './info-dashboard.component.html',
  styleUrl: './info-dashboard.component.css'
})
export class InfoDashboardComponent {

}

import { Component } from '@angular/core';
import { TumbaFormComponent } from "../../components/tumbas/tumba/tumbaForm.component";

@Component({
  selector: 'app-tumba-dashboard',
  standalone: true,
  imports: [TumbaFormComponent],
  templateUrl: './tumba-dashboard.component.html',
  styleUrl: './tumba-dashboard.component.css'
})
export class TumbaDashboardComponent {

}

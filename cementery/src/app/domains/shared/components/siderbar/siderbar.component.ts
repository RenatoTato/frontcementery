import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-siderbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.css'
})
export class SiderbarComponent {

}

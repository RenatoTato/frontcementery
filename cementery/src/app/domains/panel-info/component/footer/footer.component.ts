import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent  {
  mail:string;
  constructor(private router: Router) {
    this.mail = 'Texcersice@gmail.com';
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sidebarVisible = false;
  constructor(private router: Router){}

  isAuthenticated():boolean{
    return !!localStorage.getItem('token');
  }
  navigateToLogin():void{
    this.router.navigate(['/login']);
  }

  logout():void{
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }
}

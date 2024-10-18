import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  template: '<router-outlet/>',

})
export class AppComponent {
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // For routerLink

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule for routing
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}

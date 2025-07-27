import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

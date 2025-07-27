import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend2');

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}

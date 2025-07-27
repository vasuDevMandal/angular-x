import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Navbar } from '../../components/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.html',
  styleUrls: ['./job-list.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    Navbar,
    RouterLink
  ]
})
export class JobList {
  jobs: any[] = [];
  loading = false;
  errorMsg = '';

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  constructor(private http: HttpClient) {
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.errorMsg = '';
    // Try to load from localStorage first
    const cached = localStorage.getItem('jobs');
    if (cached) {
      this.jobs = JSON.parse(cached);
      this.loading = false;
    }
    // Always fetch latest from backend
    this.http.get<any[]>('http://localhost:3002/api/jobs').subscribe({
      next: (res) => {
        this.jobs = res;
        localStorage.setItem('jobs', JSON.stringify(res));
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Failed to load jobs';
        this.loading = false;
      }
    });
  }
}

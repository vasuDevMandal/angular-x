import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Navbar } from '../../components/navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.html',
  styleUrls: ['./job-create.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    Navbar
  ]
})
export class JobCreate {
  jobForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) return;
    this.loading = true;
    this.errorMsg = '';
    this.http.post<any>('http://localhost:3002/api/jobs', this.jobForm.value).subscribe({
      next: (res) => {
        // Update jobs in localStorage
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        jobs.push(res);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        this.router.navigate(['/job-list']);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Job creation failed';
        this.loading = false;
      }
    });
  }
}

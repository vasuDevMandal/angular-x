import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../components/navbar/navbar';
import { MatError } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Navbar
  ]
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMsg = '';
    this.http.post<any>('http://localhost:3002/api/login', this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/job-list']);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup').then(m => m.Signup)
  },
  {
    path: 'job-list',
    loadComponent: () => import('./pages/job-list/job-list').then(m => m.JobList)
  },
  {
    path: 'job-create',
    loadComponent: () => import('./pages/job-create/job-create').then(m => m.JobCreate)
  }
];

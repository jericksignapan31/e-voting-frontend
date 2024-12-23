import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CandidatesComponent } from './core/candidates/candidates.component';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'layout',
    component: LayoutComponent,
    title: 'Layout',
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent, 
        title: 'Dashboard',
      },
      {
        path: 'candidates',
        component: CandidatesComponent,
        title: 'Candidates',
      },
    ],
  },
];

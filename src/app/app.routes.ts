import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CandidatesComponent } from './core/candidates/candidates.component';
import { LayoutComponent } from './core/layout/layout.component';
import { PositionComponent } from './core/position/position.component';
import { BallotsComponent } from './core/ballots/ballots.component';
import { AnnouncementsComponent } from './core/announcements/announcements.component';
import { BallotsReportComponent } from './core/ballots/ballots-report/ballots-report.component';
import { StudentsComponent } from './core/students/students.component';

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
      {
        path: 'position',
        component: PositionComponent,
        title: 'Position',
      },
      {
        path: 'ballots',
        component: BallotsComponent,
        title: 'Ballots',
      },
      {
        path: 'announcements',
        component: AnnouncementsComponent,
        title: 'Announcements',
      },
      {
        path: 'ballotsReport',
        component: BallotsReportComponent,
        title: 'Ballots-Report',
      },
      {
        path: 'students',
        component: StudentsComponent,
        title: 'Students',
      },
    ],
  },
];

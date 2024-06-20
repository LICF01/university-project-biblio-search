import { Routes } from '@angular/router';
import { FacultyComponent } from './features/faculty/faculty.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/faculty',
    pathMatch: 'full',
  },
  {
    path: 'faculty',
    title: 'Manage faculties',
    component: FacultyComponent,
  },
];

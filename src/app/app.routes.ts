import { Routes } from '@angular/router';
import { FacultyComponent } from './features/faculty/faculty.component';
import { SubjectComponent } from './features/subject/subject.component';

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
  {
    path: 'subject',
    title: 'Manage subjects',
    component: SubjectComponent,
  },
];

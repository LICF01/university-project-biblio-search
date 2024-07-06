import { Routes } from '@angular/router';
import { FacultyComponent } from './features/faculty/faculty.component';
import { SubjectComponent } from './features/subject/subject.component';
import { ResourcesComponent } from './features/resources/resources.component';
import { BibliographyComponent } from './features/bibliography/bibliography.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/faculty',
    pathMatch: 'full',
  },
  {
    path: 'faculty',
    title: 'Administrar Facultades',
    component: FacultyComponent,
  },
  {
    path: 'subject',
    title: 'Administrar Materias',
    component: SubjectComponent,
  },
  {
    path: 'resources',
    title: 'Administrar Materiales',
    component: ResourcesComponent,
  },
  {
    path: 'bibliography',
    title: 'Administrar Bibliografías',
    component: BibliographyComponent,
  },
];

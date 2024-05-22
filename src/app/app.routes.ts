import { Routes } from '@angular/router';
import { BookSearchComponent } from './features/book-search/book-search.component';

export const routes: Routes = [
  {
    path: '',
    component: BookSearchComponent,
  },
  {
    path: 'books/search',
    title: 'Search',
    component: BookSearchComponent,
  },
  {
    path: 'books/manage',
    title: 'Manage books',
    component: BookSearchComponent,
  },
];

import { Routes } from '@angular/router';
import { BookSearchComponent } from './features/book-search/book-search.component';
import { BookManagerComponent } from './features/book-manager/book-manager.component';

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
    path: 'books/manager',
    title: 'Manage books',
    component: BookManagerComponent,
  },
];

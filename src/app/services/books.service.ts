import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Books, PaginationParams } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url = 'http://localhost:3000/books';

  constructor(private apiService: ApiService) {}

  getBooks = (params: PaginationParams): Observable<Books> => {
    return this.apiService.get(this.url, {
      params,
      responseType: 'json',
    });
  };

  getAllBooks(): Observable<Books> {
    return this.apiService.get(`${this.url}/all`, {
      responseType: 'json',
    });
  }
}

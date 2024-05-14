import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Books, PaginationParams } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private apiService: ApiService) {}

  getBooks = (url: string, params: PaginationParams): Observable<Books> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}

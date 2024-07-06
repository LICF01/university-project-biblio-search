import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Bibliography } from '../../../types';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class BibliographyService {
  url = environment.apiUrl + environment.bibliographyEndpoint;

  constructor(private apiService: ApiService) {}

  getAllBibliographies(): Observable<Bibliography[]> {
    return this.apiService.get(this.url, {
      responseType: 'json',
    });
  }

  createBibliography(data: any): Observable<Bibliography> {
    return this.apiService.post(this.url, data, {
      responseType: 'json',
    });
  }

  updateBibliography(data: any, id: number): Observable<Bibliography> {
    return this.apiService.patch(this.url + `/${id}`, data, {
      responseType: 'json',
    });
  }

  deleteBibliography(id: number): Observable<Bibliography> {
    return this.apiService.delete(this.url + `/${id}`, {
      responseType: 'json',
    });
  }
}

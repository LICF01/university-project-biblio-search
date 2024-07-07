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

  createBibliography(data: {
    material: string;
    materia: string;
    type: number;
  }): Observable<Bibliography> {
    return this.apiService.post(
      `${this.url}/${data.materia}/${data.material}`,
      data,
      {
        responseType: 'json',
      },
    );
  }

  updateBibliography(data: any, id: number): Observable<Bibliography> {
    return this.apiService.patch(
      `${this.url}/${data.materia}/${data.material}`,
      data,
      {
        responseType: 'json',
      },
    );
  }

  deleteBibliography(data: any): Observable<Bibliography> {
    return this.apiService.delete(
      `${this.url}/${data.idmateria}/${data.idmaterial}`,
      {
        responseType: 'json',
      },
    );
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Faculty } from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  url = environment.apiUrl + environment.facultyEndpoint;

  constructor(private apiService: ApiService) {}

  getAllFaculties(): Observable<Faculty[]> {
    return this.apiService.get(this.url, {
      responseType: 'json',
    });
  }

  createFaculty(data: any): Observable<Faculty> {
    return this.apiService.post(this.url, data, {
      responseType: 'json',
    });
  }

  updateFaculty(data: any, id: string): Observable<Faculty> {
    return this.apiService.patch(this.url + `/${id}`, data, {
      responseType: 'json',
    });
  }

  deleteFaculty(id: string): Observable<Faculty> {
    return this.apiService.delete(this.url + `/${id}`, {
      responseType: 'json',
    });
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Resource } from '../../../types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  url = environment.apiUrl + environment.resourceEndpoint;

  constructor(private apiService: ApiService) {}

  getAllFaculties(): Observable<Resource[]> {
    return this.apiService.get(this.url, {
      responseType: 'json',
    });
  }

  createFaculty(data: any): Observable<Resource> {
    return this.apiService.post(this.url, data, {
      responseType: 'json',
    });
  }

  updateFaculty(data: any, id: string): Observable<Resource> {
    return this.apiService.patch(this.url + `/${id}`, data, {
      responseType: 'json',
    });
  }

  deleteFaculty(id: string): Observable<Resource> {
    return this.apiService.delete(this.url + `/${id}`, {
      responseType: 'json',
    });
  }
}

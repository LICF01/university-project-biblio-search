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

  getAllResources(): Observable<Resource[]> {
    return this.apiService.get(this.url, {
      responseType: 'json',
    });
  }

  createResource(data: any): Observable<Resource> {
    return this.apiService.post(this.url, data, {
      responseType: 'json',
    });
  }

  updateResource(data: any, id: number): Observable<Resource> {
    return this.apiService.patch(this.url + `/${id}`, data, {
      responseType: 'json',
    });
  }

  deleteResource(id: number): Observable<Resource> {
    return this.apiService.delete(this.url + `/${id}`, {
      responseType: 'json',
    });
  }
}

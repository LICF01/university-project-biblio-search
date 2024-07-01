import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Subject } from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  url = environment.apiUrl + environment.subjectsEndpoint;

  constructor(private apiService: ApiService) {}

  getAllSubjects(): Observable<Subject[]> {
    return this.apiService.get(this.url, {
      responseType: 'json',
    });
  }

  createSubject(data: any): Observable<Subject> {
    return this.apiService.post(this.url, data, {
      responseType: 'json',
    });
  }

  updateSubject(data: any, id: number): Observable<Subject> {
    return this.apiService.patch(this.url + `/${id}`, data, {
      responseType: 'json',
    });
  }

  deleteSubject(id: number): Observable<Subject> {
    return this.apiService.delete(this.url + `/${id}`, {
      responseType: 'json',
    });
  }
}

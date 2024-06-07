import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(url: string, data: any, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, data, options) as Observable<T>;
  }

  patch<T>(url: string, data: any, options: Options): Observable<T> {
    return this.httpClient.patch<T>(url, data, options) as Observable<T>;
  }

  put<T>(url: string, data: any, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, data, options) as Observable<T>;
  }

  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, options) as Observable<T>;
  }
}

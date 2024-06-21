import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export type Book = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  category: string;
};

export interface Books {
  items: Book[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
  searchValue: string;
}

export type Row = Faculty | Subject;

export type Column = {
  field: keyof Faculty | keyof Subject;
  header: string;
};

export type Faculty = {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export type Subject = {
  id: string;
  name: string;
  description: string;
  faculty: string[];
  created_at: Date;
  updated_at: Date;
};

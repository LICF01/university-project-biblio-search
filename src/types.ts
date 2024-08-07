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

export type Row = Faculty | Subject | Resource | Bibliography;

export type Column = {
  field: keyof Faculty | keyof Subject | keyof Resource | keyof Bibliography;
  header: string;
};

export type Faculty = {
  idfacultad: string;
  nombre: string;
};

export type Subject = {
  idmateria: number;
  nombre_materia: string;
  idfacultad: number;
  nombre_facultad: string;
};

export type Resource = {
  idmaterial: number;
  materialId?: number;
  titulo: string;
  autor: string;
  tipomaterial: number;
  nombreTipoMaterial?: string;
  url: string;
};

export type Bibliography = {
  idmaterial: number;
  titulo_material: string;
  autor_material: string;
  idmateria: number;
  nombre_materia: string;
  tipobibliografia: number;
};

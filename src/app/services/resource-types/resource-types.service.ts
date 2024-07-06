import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResourceTypesService {
  private resourceTypes = {
    1: 'Libro',
    2: 'Artículo',
    3: 'Revista',
    4: 'Tesis',
    5: 'Otro',
  };

  constructor() {}

  getResourceTypes() {
    return this.resourceTypes;
  }
}

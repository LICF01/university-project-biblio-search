import { TestBed } from '@angular/core/testing';

import { ResourceTypesService } from './resource-types.service';

describe('ResourceTypesService', () => {
  let service: ResourceTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

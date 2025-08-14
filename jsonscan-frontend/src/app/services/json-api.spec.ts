import { TestBed } from '@angular/core/testing';

import { JsonApiService } from './json-api';

describe('JsonApiService', () => {
  let service: JsonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

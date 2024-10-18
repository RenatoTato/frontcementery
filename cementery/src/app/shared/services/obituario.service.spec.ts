import { TestBed } from '@angular/core/testing';

import { ObituarioService } from './obituario.service';

describe('ObituarioService', () => {
  let service: ObituarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObituarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

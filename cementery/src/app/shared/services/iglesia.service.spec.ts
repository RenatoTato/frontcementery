import { TestBed } from '@angular/core/testing';

import { IglesiaService } from './iglesia.service';

describe('IglesiaService', () => {
  let service: IglesiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IglesiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

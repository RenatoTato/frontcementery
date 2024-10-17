import { TestBed } from '@angular/core/testing';

import { TumbaService } from './tumba.service';

describe('TumbaService', () => {
  let service: TumbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TumbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

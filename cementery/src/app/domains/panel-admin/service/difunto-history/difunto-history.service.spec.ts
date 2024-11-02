import { TestBed } from '@angular/core/testing';

import { DifuntoHistoryService } from './difunto-history.service';

describe('DifuntoHistoryService', () => {
  let service: DifuntoHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifuntoHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TumbaHistoryService } from './tumba-history.service';

describe('TumbaHistoryService', () => {
  let service: TumbaHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TumbaHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

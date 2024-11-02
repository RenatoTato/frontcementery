import { TestBed } from '@angular/core/testing';

import { ServicioHistoryService } from './servicio-history.service';

describe('ServicioHistoryService', () => {
  let service: ServicioHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HistorialConfigService } from './historial-config.service';

describe('HistorialConfigService', () => {
  let service: HistorialConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteReporteComponent } from './lote-reporte.component';

describe('LoteReporteComponent', () => {
  let component: LoteReporteComponent;
  let fixture: ComponentFixture<LoteReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

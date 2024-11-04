import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifuntoReporteComponent } from './difunto-reporte.component';

describe('DifuntoReporteComponent', () => {
  let component: DifuntoReporteComponent;
  let fixture: ComponentFixture<DifuntoReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifuntoReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifuntoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

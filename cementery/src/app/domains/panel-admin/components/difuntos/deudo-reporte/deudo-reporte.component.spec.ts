import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoReporteComponent } from './deudo-reporte.component';

describe('DeudoReporteComponent', () => {
  let component: DeudoReporteComponent;
  let fixture: ComponentFixture<DeudoReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeudoReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

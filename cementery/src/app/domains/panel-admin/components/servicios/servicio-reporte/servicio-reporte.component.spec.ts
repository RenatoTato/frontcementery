import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioReporteComponent } from './servicio-reporte.component';

describe('ServicioReporteComponent', () => {
  let component: ServicioReporteComponent;
  let fixture: ComponentFixture<ServicioReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

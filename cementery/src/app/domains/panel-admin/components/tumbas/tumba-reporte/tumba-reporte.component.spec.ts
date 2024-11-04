import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbaReporteComponent } from './tumba-reporte.component';

describe('TumbaReporteComponent', () => {
  let component: TumbaReporteComponent;
  let fixture: ComponentFixture<TumbaReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TumbaReporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TumbaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

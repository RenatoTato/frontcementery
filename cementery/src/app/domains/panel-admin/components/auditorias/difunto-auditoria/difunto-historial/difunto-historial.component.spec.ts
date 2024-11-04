import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifuntoHistorialComponent } from './difunto-historial.component';

describe('DifuntoHistorialComponent', () => {
  let component: DifuntoHistorialComponent;
  let fixture: ComponentFixture<DifuntoHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifuntoHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifuntoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

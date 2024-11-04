import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoHistorialComponent } from './deudo-historial.component';

describe('DeudoHistorialComponent', () => {
  let component: DeudoHistorialComponent;
  let fixture: ComponentFixture<DeudoHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeudoHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

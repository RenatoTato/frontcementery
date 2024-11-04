import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteHistorialComponent } from './lote-historial.component';

describe('LoteHistorialComponent', () => {
  let component: LoteHistorialComponent;
  let fixture: ComponentFixture<LoteHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

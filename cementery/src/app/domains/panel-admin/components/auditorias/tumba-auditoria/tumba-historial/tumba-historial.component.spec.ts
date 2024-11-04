import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbaHistorialComponent } from './tumba-historial.component';

describe('TumbaHistorialComponent', () => {
  let component: TumbaHistorialComponent;
  let fixture: ComponentFixture<TumbaHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TumbaHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TumbaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

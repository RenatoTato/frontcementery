import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioEditarComponent } from './servicio-editar.component';

describe('ServicioEditarComponent', () => {
  let component: ServicioEditarComponent;
  let fixture: ComponentFixture<ServicioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

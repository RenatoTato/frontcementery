import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioFormComponent } from './servicioForm.component';

describe('ServicioComponent', () => {
  let component: ServicioFormComponent;
  let fixture: ComponentFixture<ServicioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

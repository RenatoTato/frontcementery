import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoFormComponent } from './deudoForm.component';

describe('DeudoComponent', () => {
  let component: DeudoFormComponent;
  let fixture: ComponentFixture<DeudoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeudoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

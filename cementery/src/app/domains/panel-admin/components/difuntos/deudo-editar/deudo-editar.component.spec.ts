import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoEditarComponent } from './deudo-editar.component';

describe('DeudoEditarComponent', () => {
  let component: DeudoEditarComponent;
  let fixture: ComponentFixture<DeudoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeudoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

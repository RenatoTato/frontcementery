import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionEditarComponent } from './seccion-editar.component';

describe('SeccionEditarComponent', () => {
  let component: SeccionEditarComponent;
  let fixture: ComponentFixture<SeccionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

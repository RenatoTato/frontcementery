import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObituarioEditarComponent } from './obituario-editar.component';

describe('ObituarioEditarComponent', () => {
  let component: ObituarioEditarComponent;
  let fixture: ComponentFixture<ObituarioEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObituarioEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObituarioEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

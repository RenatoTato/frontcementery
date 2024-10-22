import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifuntoEditarComponent } from './difunto-editar.component';

describe('DifuntoEditarComponent', () => {
  let component: DifuntoEditarComponent;
  let fixture: ComponentFixture<DifuntoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifuntoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifuntoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

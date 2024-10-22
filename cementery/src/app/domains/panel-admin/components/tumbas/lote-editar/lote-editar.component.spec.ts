import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteEditarComponent } from './lote-editar.component';

describe('LoteEditarComponent', () => {
  let component: LoteEditarComponent;
  let fixture: ComponentFixture<LoteEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

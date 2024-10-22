import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaEditarComponent } from './guia-editar.component';

describe('GuiaEditarComponent', () => {
  let component: GuiaEditarComponent;
  let fixture: ComponentFixture<GuiaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

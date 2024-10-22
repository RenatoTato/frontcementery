import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaEditarComponent } from './etapa-editar.component';

describe('EtapaEditarComponent', () => {
  let component: EtapaEditarComponent;
  let fixture: ComponentFixture<EtapaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtapaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

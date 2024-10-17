import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaGraficaComponent } from './consulta-grafica.component';

describe('ConsultaGraficaComponent', () => {
  let component: ConsultaGraficaComponent;
  let fixture: ComponentFixture<ConsultaGraficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaGraficaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

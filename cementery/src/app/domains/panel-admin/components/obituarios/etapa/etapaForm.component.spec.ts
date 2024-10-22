import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaFormComponent } from './etapaForm.component';

describe('EtapaComponent', () => {
  let component: EtapaFormComponent;
  let fixture: ComponentFixture<EtapaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtapaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

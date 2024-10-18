import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifuntoFormComponent } from './difuntoForm.component';

describe('DifuntoComponent', () => {
  let component: DifuntoFormComponent;
  let fixture: ComponentFixture<DifuntoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifuntoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifuntoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifuntoInfoComponent } from './difunto-info.component';

describe('DifuntoInfoComponent', () => {
  let component: DifuntoInfoComponent;
  let fixture: ComponentFixture<DifuntoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifuntoInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifuntoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

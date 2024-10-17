import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifuntoDashboardComponent } from './difunto-dashboard.component';

describe('DifuntoDashboardComponent', () => {
  let component: DifuntoDashboardComponent;
  let fixture: ComponentFixture<DifuntoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifuntoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifuntoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

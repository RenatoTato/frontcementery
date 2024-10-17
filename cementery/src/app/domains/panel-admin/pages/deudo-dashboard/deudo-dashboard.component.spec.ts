import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoDashboardComponent } from './deudo-dashboard.component';

describe('DeudoDashboardComponent', () => {
  let component: DeudoDashboardComponent;
  let fixture: ComponentFixture<DeudoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeudoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

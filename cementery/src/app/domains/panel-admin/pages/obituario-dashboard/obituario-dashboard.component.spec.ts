import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObituarioDashboardComponent } from './obituario-dashboard.component'; 
describe('ObituarioDashboardComponent', () => {
  let component: ObituarioDashboardComponent;
  let fixture: ComponentFixture<ObituarioDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObituarioDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObituarioDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

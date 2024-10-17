import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbaDashboardComponent } from './tumba-dashboard.component';

describe('TumbaDashboardComponent', () => {
  let component: TumbaDashboardComponent;
  let fixture: ComponentFixture<TumbaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TumbaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TumbaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

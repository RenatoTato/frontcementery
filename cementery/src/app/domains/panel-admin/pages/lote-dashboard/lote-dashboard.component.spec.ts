import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoteDashboardComponent } from './lote-dashboard.component';

describe('LoteDashboardComponent', () => {
  let component: LoteDashboardComponent;
  let fixture: ComponentFixture<LoteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoteDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

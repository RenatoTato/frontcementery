import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaDashboardComponent } from './guia-dashboard.component';

describe('GuiaDashboardComponent', () => {
  let component: GuiaDashboardComponent;
  let fixture: ComponentFixture<GuiaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

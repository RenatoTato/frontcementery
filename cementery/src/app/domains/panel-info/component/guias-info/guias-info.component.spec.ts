import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasInfoComponent } from './guias-info.component';

describe('GuiasInfoComponent', () => {
  let component: GuiasInfoComponent;
  let fixture: ComponentFixture<GuiasInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiasInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

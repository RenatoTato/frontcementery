import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaFormComponent } from './guiaForm.component';

describe('GuiaComponent', () => {
  let component: GuiaFormComponent;
  let fixture: ComponentFixture<GuiaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

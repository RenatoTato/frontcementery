import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IglesiaFormComponent } from './iglesiaForm.component';

describe('IglesiaComponent', () => {
  let component: IglesiaFormComponent;
  let fixture: ComponentFixture<IglesiaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IglesiaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IglesiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

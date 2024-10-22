import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParroquiaFormComponent } from './parroquiaForm.component';

describe('ParroquiaComponent', () => {
  let component: ParroquiaFormComponent;
  let fixture: ComponentFixture<ParroquiaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParroquiaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParroquiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

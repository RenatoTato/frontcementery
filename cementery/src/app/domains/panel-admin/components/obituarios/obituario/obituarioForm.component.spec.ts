import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObituarioFormComponent } from './obituarioForm.component';

describe('ObituarioComponent', () => {
  let component: ObituarioFormComponent;
  let fixture: ComponentFixture<ObituarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObituarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObituarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

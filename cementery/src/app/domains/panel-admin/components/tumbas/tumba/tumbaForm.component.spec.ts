import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbaFormComponent } from './tumbaForm.component';

describe('TumbaComponent', () => {
  let component: TumbaFormComponent;
  let fixture: ComponentFixture<TumbaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TumbaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TumbaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

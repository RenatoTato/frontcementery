import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbaComponent } from './tumba.component';

describe('TumbaComponent', () => {
  let component: TumbaComponent;
  let fixture: ComponentFixture<TumbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TumbaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TumbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

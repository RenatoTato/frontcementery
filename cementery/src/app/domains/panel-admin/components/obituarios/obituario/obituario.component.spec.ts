import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObituarioComponent } from './obituario.component';

describe('ObituarioComponent', () => {
  let component: ObituarioComponent;
  let fixture: ComponentFixture<ObituarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObituarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObituarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

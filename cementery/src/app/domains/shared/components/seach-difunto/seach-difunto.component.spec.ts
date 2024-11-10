import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeachDifuntoComponent } from './seach-difunto.component';

describe('SeachDifuntoComponent', () => {
  let component: SeachDifuntoComponent;
  let fixture: ComponentFixture<SeachDifuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeachDifuntoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeachDifuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

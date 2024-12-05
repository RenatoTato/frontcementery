import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObituarioInfosComponent } from './obituario-infos.component';

describe('ObituarioInfosComponent', () => {
  let component: ObituarioInfosComponent;
  let fixture: ComponentFixture<ObituarioInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObituarioInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObituarioInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObituariosPinfoComponent } from './obituarios-pinfo.component';

describe('ObituariosPinfoComponent', () => {
  let component: ObituariosPinfoComponent;
  let fixture: ComponentFixture<ObituariosPinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObituariosPinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObituariosPinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

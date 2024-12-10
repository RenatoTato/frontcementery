import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParroquiaPinfoComponent } from './parroquia-pinfo.component';

describe('ParroquiaPinfoComponent', () => {
  let component: ParroquiaPinfoComponent;
  let fixture: ComponentFixture<ParroquiaPinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParroquiaPinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParroquiaPinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

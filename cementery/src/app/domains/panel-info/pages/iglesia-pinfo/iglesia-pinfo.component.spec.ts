import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IglesiaPinfoComponent } from './iglesia-pinfo.component';

describe('IglesiaPinfoComponent', () => {
  let component: IglesiaPinfoComponent;
  let fixture: ComponentFixture<IglesiaPinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IglesiaPinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IglesiaPinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

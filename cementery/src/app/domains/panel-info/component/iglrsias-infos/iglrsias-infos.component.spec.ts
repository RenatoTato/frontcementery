import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IglrsiasInfosComponent } from './iglrsias-infos.component';

describe('IglrsiasInfosComponent', () => {
  let component: IglrsiasInfosComponent;
  let fixture: ComponentFixture<IglrsiasInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IglrsiasInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IglrsiasInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloPinfoComponent } from './articulo-pinfo.component';

describe('ArticuloPinfoComponent', () => {
  let component: ArticuloPinfoComponent;
  let fixture: ComponentFixture<ArticuloPinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloPinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloPinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

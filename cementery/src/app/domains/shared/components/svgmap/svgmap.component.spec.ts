import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgmapComponent } from './svgmap.component';

describe('SvgmapComponent', () => {
  let component: SvgmapComponent;
  let fixture: ComponentFixture<SvgmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgmapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

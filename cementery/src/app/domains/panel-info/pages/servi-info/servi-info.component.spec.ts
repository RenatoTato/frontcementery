import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiInfoComponent } from './servi-info.component';

describe('ServiInfoComponent', () => {
  let component: ServiInfoComponent;
  let fixture: ComponentFixture<ServiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

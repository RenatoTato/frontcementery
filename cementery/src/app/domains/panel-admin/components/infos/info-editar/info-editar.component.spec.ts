import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEditarComponent } from './info-editar.component';

describe('InfoEditarComponent', () => {
  let component: InfoEditarComponent;
  let fixture: ComponentFixture<InfoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

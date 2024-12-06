import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionInfosComponent } from './seccion-infos.component';

describe('SeccionInfosComponent', () => {
  let component: SeccionInfosComponent;
  let fixture: ComponentFixture<SeccionInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeccionInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

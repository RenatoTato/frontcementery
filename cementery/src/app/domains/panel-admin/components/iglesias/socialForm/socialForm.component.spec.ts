import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFormComponent } from './socialForm.component';

describe('SocialComponent', () => {
  let component: SocialFormComponent;
  let fixture: ComponentFixture<SocialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

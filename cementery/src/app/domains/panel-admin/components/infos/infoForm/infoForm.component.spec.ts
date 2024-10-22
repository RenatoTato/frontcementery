import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFormComponent } from './infoForm.component';

describe('InfoComponent', () => {
  let component: InfoFormComponent;
  let fixture: ComponentFixture<InfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaFormComponent } from './memoriaForm.component';

describe('MemoriaComponent', () => {
  let component: MemoriaFormComponent;
  let fixture: ComponentFixture<MemoriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoriaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

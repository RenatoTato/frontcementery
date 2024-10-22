import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbaEditarComponent } from './tumba-editar.component';

describe('TumbaEditarComponent', () => {
  let component: TumbaEditarComponent;
  let fixture: ComponentFixture<TumbaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TumbaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TumbaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

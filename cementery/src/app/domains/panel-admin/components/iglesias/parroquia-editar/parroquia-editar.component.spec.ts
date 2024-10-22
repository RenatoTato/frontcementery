import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParroquiaEditarComponent } from './parroquia-editar.component';

describe('ParroquiaEditarComponent', () => {
  let component: ParroquiaEditarComponent;
  let fixture: ComponentFixture<ParroquiaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParroquiaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParroquiaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

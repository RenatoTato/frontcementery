import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IglesiaEditarComponent } from './iglesia-editar.component';

describe('IglesiaEditarComponent', () => {
  let component: IglesiaEditarComponent;
  let fixture: ComponentFixture<IglesiaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IglesiaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IglesiaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

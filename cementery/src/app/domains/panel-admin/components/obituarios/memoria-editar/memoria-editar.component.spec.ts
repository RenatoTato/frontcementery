import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaEditarComponent } from './memoria-editar.component';

describe('MemoriaEditarComponent', () => {
  let component: MemoriaEditarComponent;
  let fixture: ComponentFixture<MemoriaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoriaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoriaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

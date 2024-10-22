import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloEditarComponent } from './articulo-editar.component';

describe('ArticuloEditarComponent', () => {
  let component: ArticuloEditarComponent;
  let fixture: ComponentFixture<ArticuloEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

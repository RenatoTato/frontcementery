import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloFormComponent } from './articuloForm.component';

describe('ArticuloComponent', () => {
  let component: ArticuloFormComponent;
  let fixture: ComponentFixture<ArticuloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

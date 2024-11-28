import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloInfoComponent } from './articulo-info.component';

describe('ArticuloInfoComponent', () => {
  let component: ArticuloInfoComponent;
  let fixture: ComponentFixture<ArticuloInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

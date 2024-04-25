import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriasComponent } from './create-categorias.component';

describe('CreateCategoriasComponent', () => {
  let component: CreateCategoriasComponent;
  let fixture: ComponentFixture<CreateCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

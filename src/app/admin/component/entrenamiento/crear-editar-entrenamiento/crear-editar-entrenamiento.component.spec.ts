import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarEntrenamientoComponent } from './crear-editar-entrenamiento.component';

describe('CrearEditarEntrenamientoComponent', () => {
  let component: CrearEditarEntrenamientoComponent;
  let fixture: ComponentFixture<CrearEditarEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarEntrenamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEditarEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

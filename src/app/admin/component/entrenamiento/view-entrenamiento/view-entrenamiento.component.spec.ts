import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEntrenamientoComponent } from './view-entrenamiento.component';

describe('ViewEntrenamientoComponent', () => {
  let component: ViewEntrenamientoComponent;
  let fixture: ComponentFixture<ViewEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEntrenamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

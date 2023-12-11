import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarPlanComponent } from './crear-editar-plan.component';

describe('CrearEditarPlanComponent', () => {
  let component: CrearEditarPlanComponent;
  let fixture: ComponentFixture<CrearEditarPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEditarPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEditarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

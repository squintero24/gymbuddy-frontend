import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisEntrenamientosComponent } from './mis-entrenamientos.component';

describe('EntrenamientosComponent', () => {
  let component: MisEntrenamientosComponent;
  let fixture: ComponentFixture<MisEntrenamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisEntrenamientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

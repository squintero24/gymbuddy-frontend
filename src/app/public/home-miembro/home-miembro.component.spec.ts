import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMiembroComponent } from './home-miembro.component';

describe('HomeMiembroComponent', () => {
  let component: HomeMiembroComponent;
  let fixture: ComponentFixture<HomeMiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMiembroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

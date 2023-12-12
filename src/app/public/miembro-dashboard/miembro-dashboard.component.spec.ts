import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroDashboardComponent } from './miembro-dashboard.component';

describe('MiembroDashboardComponent', () => {
  let component: MiembroDashboardComponent;
  let fixture: ComponentFixture<MiembroDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiembroDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiembroDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

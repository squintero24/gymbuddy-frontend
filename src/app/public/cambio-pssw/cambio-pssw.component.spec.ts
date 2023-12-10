import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPsswComponent } from './cambio-pssw.component';

describe('CambioPsswComponent', () => {
  let component: CambioPsswComponent;
  let fixture: ComponentFixture<CambioPsswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioPsswComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioPsswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

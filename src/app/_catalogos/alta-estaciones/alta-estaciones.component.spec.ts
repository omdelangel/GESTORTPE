import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaEstacionesComponent } from './alta-estaciones.component';

describe('AltaEstacionesComponent', () => {
  let component: AltaEstacionesComponent;
  let fixture: ComponentFixture<AltaEstacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaEstacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEstacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

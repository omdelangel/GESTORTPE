import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionEstacionesComponent } from './edicion-estaciones.component';

describe('EdicionEstacionesComponent', () => {
  let component: EdicionEstacionesComponent;
  let fixture: ComponentFixture<EdicionEstacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionEstacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionEstacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

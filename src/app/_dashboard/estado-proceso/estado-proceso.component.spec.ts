import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoProcesoComponent } from './estado-proceso.component';

describe('EstadoProcesoComponent', () => {
  let component: EstadoProcesoComponent;
  let fixture: ComponentFixture<EstadoProcesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoProcesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

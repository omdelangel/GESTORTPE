import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacionesTipoVehiculoChartComponent } from './instalaciones-tipo-vehiculo-chart.component';

describe('InstalacionesTipoVehiculoChartComponent', () => {
  let component: InstalacionesTipoVehiculoChartComponent;
  let fixture: ComponentFixture<InstalacionesTipoVehiculoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalacionesTipoVehiculoChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalacionesTipoVehiculoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

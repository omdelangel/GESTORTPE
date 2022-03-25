import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaSindicatosComponent } from './alta-sindicatos.component';

describe('AltaSindicatosComponent', () => {
  let component: AltaSindicatosComponent;
  let fixture: ComponentFixture<AltaSindicatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaSindicatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaSindicatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

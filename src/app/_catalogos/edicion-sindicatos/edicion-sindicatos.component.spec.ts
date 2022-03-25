import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionSindicatosComponent } from './edicion-sindicatos.component';

describe('EdicionSindicatosComponent', () => {
  let component: EdicionSindicatosComponent;
  let fixture: ComponentFixture<EdicionSindicatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionSindicatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionSindicatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

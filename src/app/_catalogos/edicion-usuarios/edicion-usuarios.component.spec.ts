import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionUsuariosComponent } from './edicion-usuarios.component';

describe('EdicionUsuariosComponent', () => {
  let component: EdicionUsuariosComponent;
  let fixture: ComponentFixture<EdicionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

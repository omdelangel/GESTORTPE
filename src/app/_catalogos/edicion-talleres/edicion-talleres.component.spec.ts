import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionTalleresComponent } from './edicion-talleres.component';

describe('EdicionTalleresComponent', () => {
  let component: EdicionTalleresComponent;
  let fixture: ComponentFixture<EdicionTalleresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionTalleresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

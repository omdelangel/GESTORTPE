import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTalleresComponent } from './alta-talleres.component';

describe('AltaTalleresComponent', () => {
  let component: AltaTalleresComponent;
  let fixture: ComponentFixture<AltaTalleresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaTalleresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

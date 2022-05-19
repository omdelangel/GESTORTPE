import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDictamenSeguroComponent } from './dialogo-dictamen-seguro.component';

describe('DialogoDictamenSeguroComponent', () => {
  let component: DialogoDictamenSeguroComponent;
  let fixture: ComponentFixture<DialogoDictamenSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoDictamenSeguroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoDictamenSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoContratosSinCitaComponent } from './repo-contratos-sin-cita.component';

describe('RepoContratosSinCitaComponent', () => {
  let component: RepoContratosSinCitaComponent;
  let fixture: ComponentFixture<RepoContratosSinCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoContratosSinCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoContratosSinCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

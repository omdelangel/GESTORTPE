import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoAnalisisSinCitaComponent } from './repo-analisis-sin-cita.component';

describe('RepoAnalisisSinCitaComponent', () => {
  let component: RepoAnalisisSinCitaComponent;
  let fixture: ComponentFixture<RepoAnalisisSinCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoAnalisisSinCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoAnalisisSinCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

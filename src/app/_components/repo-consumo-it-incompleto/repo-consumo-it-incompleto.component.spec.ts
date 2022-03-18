import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoConsumoItIncompletoComponent } from './repo-consumo-it-incompleto.component';

describe('RepoConsumoItIncompletoComponent', () => {
  let component: RepoConsumoItIncompletoComponent;
  let fixture: ComponentFixture<RepoConsumoItIncompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoConsumoItIncompletoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoConsumoItIncompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

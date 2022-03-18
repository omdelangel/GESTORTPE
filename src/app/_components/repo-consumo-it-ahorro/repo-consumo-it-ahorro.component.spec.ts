import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoConsumoItAhorroComponent } from './repo-consumo-it-ahorro.component';

describe('RepoConsumoItAhorroComponent', () => {
  let component: RepoConsumoItAhorroComponent;
  let fixture: ComponentFixture<RepoConsumoItAhorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoConsumoItAhorroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoConsumoItAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

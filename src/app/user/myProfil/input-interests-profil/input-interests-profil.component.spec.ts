import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInterestsProfilComponent } from './input-interests-profil.component';

describe('InputInterestsComponent', () => {
  let component: InputInterestsProfilComponent;
  let fixture: ComponentFixture<InputInterestsProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInterestsProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInterestsProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInterestsRegisterComponent } from './input-interests-register.component';

describe('InputInterestsRegisterComponent', () => {
  let component: InputInterestsRegisterComponent;
  let fixture: ComponentFixture<InputInterestsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInterestsRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInterestsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

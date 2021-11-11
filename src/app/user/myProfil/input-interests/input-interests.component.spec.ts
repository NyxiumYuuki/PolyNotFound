import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInterestsComponent } from './input-interests.component';

describe('InputInterestsComponent', () => {
  let component: InputInterestsComponent;
  let fixture: ComponentFixture<InputInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

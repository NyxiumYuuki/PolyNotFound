import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupForgottenPasswordComponent } from './popup-forgotten-password.component';

describe('PopupForgottenPasswordComponent', () => {
  let component: PopupForgottenPasswordComponent;
  let fixture: ComponentFixture<PopupForgottenPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupForgottenPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupForgottenPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateUserComponent } from './popup-create-user.component';

describe('PopupCreateUserComponent', () => {
  let component: PopupCreateUserComponent;
  let fixture: ComponentFixture<PopupCreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCreateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

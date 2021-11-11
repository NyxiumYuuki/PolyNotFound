import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateUserComponent } from './popup-update-user.component';

describe('PopupUpdateUserComponent', () => {
  let component: PopupUpdateUserComponent;
  let fixture: ComponentFixture<PopupUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUpdateUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisualizeUserComponent } from './popup-visualize-user.component';

describe('PopupVisualizeUserComponent', () => {
  let component: PopupVisualizeUserComponent;
  let fixture: ComponentFixture<PopupVisualizeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisualizeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisualizeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

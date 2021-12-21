import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddOrUpdateAdComponent } from './popup-add-or-update-ad.component';

describe('PopupAddOrUpdateAdComponent', () => {
  let component: PopupAddOrUpdateAdComponent;
  let fixture: ComponentFixture<PopupAddOrUpdateAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddOrUpdateAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddOrUpdateAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

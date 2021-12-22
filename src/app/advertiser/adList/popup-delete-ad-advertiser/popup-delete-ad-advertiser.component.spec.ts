import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteAdAdvertiserComponent } from './popup-delete-ad-advertiser.component';

describe('PopupDeleteAdComponent', () => {
  let component: PopupDeleteAdAdvertiserComponent;
  let fixture: ComponentFixture<PopupDeleteAdAdvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeleteAdAdvertiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteAdAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

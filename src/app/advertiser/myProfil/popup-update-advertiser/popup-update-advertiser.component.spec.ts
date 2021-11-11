import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateAdvertiserComponent } from './popup-update-advertiser.component';

describe('PopupUpdateAdvertiserComponent', () => {
  let component: PopupUpdateAdvertiserComponent;
  let fixture: ComponentFixture<PopupUpdateAdvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUpdateAdvertiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUpdateAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

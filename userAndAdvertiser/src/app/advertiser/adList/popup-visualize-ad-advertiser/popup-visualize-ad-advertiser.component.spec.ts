import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisualizeAdAdvertiserComponent } from './popup-visualize-ad-advertiser.component';

describe('PopupVisualizeAdComponent', () => {
  let component: PopupVisualizeAdAdvertiserComponent;
  let fixture: ComponentFixture<PopupVisualizeAdAdvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisualizeAdAdvertiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisualizeAdAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisualizeImagesAdvertiserComponent } from './popup-visualize-images-advertiser.component';

describe('PopupVisualizeImagesComponent', () => {
  let component: PopupVisualizeImagesAdvertiserComponent;
  let fixture: ComponentFixture<PopupVisualizeImagesAdvertiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisualizeImagesAdvertiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisualizeImagesAdvertiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

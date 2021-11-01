import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisualizeImagesComponent } from './popup-visualize-images.component';

describe('PopupVisualizeImagesComponent', () => {
  let component: PopupVisualizeImagesComponent;
  let fixture: ComponentFixture<PopupVisualizeImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisualizeImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisualizeImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

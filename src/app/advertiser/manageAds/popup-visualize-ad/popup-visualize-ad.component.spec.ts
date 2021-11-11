import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisualizeAdComponent } from './popup-visualize-ad.component';

describe('PopupVisualizeAdComponent', () => {
  let component: PopupVisualizeAdComponent;
  let fixture: ComponentFixture<PopupVisualizeAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisualizeAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisualizeAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

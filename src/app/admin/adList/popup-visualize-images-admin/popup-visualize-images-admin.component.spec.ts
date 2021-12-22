import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisualizeImagesAdminComponent } from './popup-visualize-images-admin.component';

describe('PopupVisualizeImagesAdminComponent', () => {
  let component: PopupVisualizeImagesAdminComponent;
  let fixture: ComponentFixture<PopupVisualizeImagesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisualizeImagesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisualizeImagesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

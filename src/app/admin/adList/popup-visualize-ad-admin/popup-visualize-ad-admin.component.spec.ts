import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisualizeAdAdminComponent } from './popup-visualize-ad-admin.component';

describe('PopupVisualizeAdAdminComponent', () => {
  let component: PopupVisualizeAdAdminComponent;
  let fixture: ComponentFixture<PopupVisualizeAdAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisualizeAdAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisualizeAdAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

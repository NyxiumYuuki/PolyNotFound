import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateAdminComponent } from './popup-update-admin.component';

describe('PopupUpdateAdminComponent', () => {
  let component: PopupUpdateAdminComponent;
  let fixture: ComponentFixture<PopupUpdateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUpdateAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

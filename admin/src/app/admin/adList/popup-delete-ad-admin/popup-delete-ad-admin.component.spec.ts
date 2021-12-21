import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteAdAdminComponent } from './popup-delete-ad-admin.component';

describe('PopupDeleteAdAdminComponent', () => {
  let component: PopupDeleteAdAdminComponent;
  let fixture: ComponentFixture<PopupDeleteAdAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeleteAdAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteAdAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

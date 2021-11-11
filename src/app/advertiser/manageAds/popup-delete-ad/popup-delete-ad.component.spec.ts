import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteAdComponent } from './popup-delete-ad.component';

describe('PopupDeleteAdComponent', () => {
  let component: PopupDeleteAdComponent;
  let fixture: ComponentFixture<PopupDeleteAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeleteAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeleteAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

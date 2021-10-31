import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPictureProfilUrlComponent } from './popup-picture-profil-url.component';

describe('PopupPictureProfilUrlComponent', () => {
  let component: PopupPictureProfilUrlComponent;
  let fixture: ComponentFixture<PopupPictureProfilUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPictureProfilUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPictureProfilUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddVideoToPlaylistsComponent } from './popup-add-video-to-playlists.component';

describe('PopupAddVideoToPlaylistsComponent', () => {
  let component: PopupAddVideoToPlaylistsComponent;
  let fixture: ComponentFixture<PopupAddVideoToPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAddVideoToPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAddVideoToPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

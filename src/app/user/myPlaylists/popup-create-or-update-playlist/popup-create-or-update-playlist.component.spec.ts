import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateOrUpdatePlaylistComponent } from './popup-create-or-update-playlist.component';

describe('PopupCreatePlaylistComponent', () => {
  let component: PopupCreateOrUpdatePlaylistComponent;
  let fixture: ComponentFixture<PopupCreateOrUpdatePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCreateOrUpdatePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCreateOrUpdatePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreatePlaylistComponent } from './popup-create-playlist.component';

describe('PopupCreatePlaylistComponent', () => {
  let component: PopupCreatePlaylistComponent;
  let fixture: ComponentFixture<PopupCreatePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCreatePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCreatePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

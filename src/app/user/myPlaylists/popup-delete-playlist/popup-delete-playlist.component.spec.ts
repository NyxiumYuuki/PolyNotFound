import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeletePlaylistComponent } from './popup-delete-playlist.component';

describe('PopupDeletePlaylistComponent', () => {
  let component: PopupDeletePlaylistComponent;
  let fixture: ComponentFixture<PopupDeletePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDeletePlaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDeletePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

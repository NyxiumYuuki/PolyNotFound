import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyPlaylistsComponent } from './page-my-playlists.component';

describe('PageMesPlaylistsComponent', () => {
  let component: PageMyPlaylistsComponent;
  let fixture: ComponentFixture<PageMyPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMyPlaylistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMyPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

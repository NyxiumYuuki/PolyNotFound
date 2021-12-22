import { TestBed } from '@angular/core/testing';

import { AddVideoToPlaylistsService } from './add-video-to-playlists.service';

describe('PlaylistService', () => {
  let service: AddVideoToPlaylistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddVideoToPlaylistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

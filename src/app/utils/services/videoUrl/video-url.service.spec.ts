import { TestBed } from '@angular/core/testing';

import { VideoUrlService } from './video-url.service';

describe('VideoUrlService', () => {
  let service: VideoUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FictitiousVideosService } from './fictitious-videos.service';

describe('FictitiousVideosService', () => {
  let service: FictitiousVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FictitiousVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

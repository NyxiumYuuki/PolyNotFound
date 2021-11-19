import { TestBed } from '@angular/core/testing';

import { FictitiousAdvertsService } from './fictitious-adverts.service';

describe('FictitiousAdvertsService', () => {
  let service: FictitiousAdvertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FictitiousAdvertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

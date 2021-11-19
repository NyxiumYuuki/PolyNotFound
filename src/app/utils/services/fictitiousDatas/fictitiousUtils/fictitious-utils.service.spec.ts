import { TestBed } from '@angular/core/testing';

import { FictitiousUtilsService } from './fictitious-utils.service';

describe('FictitiousUtilsService', () => {
  let service: FictitiousUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FictitiousUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

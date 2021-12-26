import { TestBed } from '@angular/core/testing';

import { AdvertiserGuard } from './advertiser.guard';

describe('AdvertiserGuard', () => {
  let guard: AdvertiserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdvertiserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

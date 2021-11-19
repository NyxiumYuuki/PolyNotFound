import { TestBed } from '@angular/core/testing';

import { FictitiousUsersService } from './fictitious-users.service';

describe('FictitiousUsersService', () => {
  let service: FictitiousUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FictitiousUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserHistoryService } from './userHistory.service';

describe('HistoriqueService', () => {
  let service: UserHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

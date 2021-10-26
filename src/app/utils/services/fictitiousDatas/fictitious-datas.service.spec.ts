import { TestBed } from '@angular/core/testing';

import { FictitiousDatasService } from './fictitious-datas.service';

describe('FictitiousDatasService', () => {
  let service: FictitiousDatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FictitiousDatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

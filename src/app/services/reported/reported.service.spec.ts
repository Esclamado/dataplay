import { TestBed } from '@angular/core/testing';

import { ReportedService } from './reported.service';

describe('ReportedService', () => {
  let service: ReportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AthleteVerificationService } from './athlete-verification.service';

describe('AthleteVerificationService', () => {
  let service: AthleteVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthleteVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

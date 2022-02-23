import { TestBed } from '@angular/core/testing';

import { MonthlyAnalyticsService } from './monthly-analytics.service';

describe('MonthlyAnalyticsService', () => {
  let service: MonthlyAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

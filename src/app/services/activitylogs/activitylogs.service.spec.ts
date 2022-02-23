import { TestBed } from '@angular/core/testing';

import { ActivitylogsService } from './activitylogs.service';

describe('ActivitylogsService', () => {
  let service: ActivitylogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitylogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

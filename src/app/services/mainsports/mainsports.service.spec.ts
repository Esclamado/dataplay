import { TestBed } from '@angular/core/testing';

import { MainsportsService } from './mainsports.service';

describe('MainsportsService', () => {
  let service: MainsportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainsportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

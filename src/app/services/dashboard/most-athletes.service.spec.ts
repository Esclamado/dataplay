import { TestBed } from '@angular/core/testing';

import { MostAthletesService } from './most-athletes.service';

describe('MostAthletesService', () => {
  let service: MostAthletesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostAthletesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

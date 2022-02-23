import { TestBed } from '@angular/core/testing';

import { CareerHighlightsService } from './career-highlights.service';

describe('CareerHighlightsService', () => {
  let service: CareerHighlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerHighlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

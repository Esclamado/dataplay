import { TestBed } from '@angular/core/testing';

import { AuthStaffGuard } from './auth-staff.guard';

describe('AuthStaffGuard', () => {
  let guard: AuthStaffGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthStaffGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

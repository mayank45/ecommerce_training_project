import { TestBed } from '@angular/core/testing';

import { UpdateProfileGuard } from './update-profile.guard';

describe('UpdateProfileGuard', () => {
  let guard: UpdateProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UpdateProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

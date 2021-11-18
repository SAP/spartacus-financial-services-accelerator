import { TestBed } from '@angular/core/testing';

import { MyDashboardGuard } from './my-dashboard.guard';

describe('MyDashboardGuard', () => {
  let guard: MyDashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyDashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

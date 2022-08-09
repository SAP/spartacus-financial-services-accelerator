import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { UserProfileService } from '@spartacus/user/profile/core';
import { of } from 'rxjs';
import { UserProfileGuard } from './user-profile-guard';

const currentUser = {
  uid: 'testcustomer@email.com',
  roles: ['customer'],
};
class MockRoutingService {
  go() {}
}

class MockGlobalMessageService {
  add() {}
}

class MockUserProfileService {
  get() {
    return of(currentUser);
  }
}

describe(`UserProfileGuard`, () => {
  let guard: UserProfileGuard;
  let globalMessageService: GlobalMessageService;
  let routing: RoutingService;
  let userProfileService: UserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: UserProfileService,
          useClass: MockUserProfileService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(UserProfileGuard);
    routing = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    userProfileService = TestBed.inject(UserProfileService);
    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect customer to user profile page`, () => {
    const route: any = {
      url: '/financial/en/EUR/user-profile/',
      params: {
        customerId: undefined,
      },
    };
    guard
      .canActivate(route)
      .subscribe(isActive => expect(isActive).toBe(true))
      .unsubscribe();
    expect(routing.go).not.toHaveBeenCalled();
  });

  it(`should forbid customer to access user profile page`, () => {
    const route: any = {
      url: '/financial/en/EUR/user-profile/',
      params: {
        customerId: 'oboCustomerId',
      },
    };
    guard
      .canActivate(route)
      .subscribe(_ => expect(routing.go).toHaveBeenCalled())
      .unsubscribe();
  });
});

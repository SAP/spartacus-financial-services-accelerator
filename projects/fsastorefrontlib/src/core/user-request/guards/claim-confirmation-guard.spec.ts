import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import {
  ClaimConfirmationGuard,
  UserRequestService,
} from './../../../core/user-request';
import { ClaimStatus } from './../../../occ/occ-models';

const mockUserRequest = {
  requestId: 'requestId',
  requestStatus: ClaimStatus.SUBMITTED,
};

class MockRoutingService {
  go() {}
}

class MockUserRequestService {
  getClaim(): Observable<any> {
    return of({});
  }
}

class MockGlobalMessageService {
  add() {}
}

describe(`ClaimConfirmationGuard`, () => {
  let guard: ClaimConfirmationGuard;
  let service: UserRequestService;
  let routing: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: UserRequestService,
          useClass: MockUserRequestService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.get(ClaimConfirmationGuard as Type<ClaimConfirmationGuard>);
    service = TestBed.get(UserRequestService as Type<UserRequestService>);
    routing = TestBed.get(RoutingService as Type<RoutingService>);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the homepage when user request is submitted`, () => {
    mockUserRequest.requestStatus = ClaimStatus.SUBMITTED;
    spyOn(service, 'getClaim').and.returnValue(of(mockUserRequest));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBe(false);
    expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it(`should not redirect to the homepage when user request is not submitted`, () => {
    mockUserRequest.requestStatus = ClaimStatus.OPEN;
    spyOn(service, 'getClaim').and.returnValue(of(mockUserRequest));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBe(true);
    expect(routing.go).not.toHaveBeenCalled();
  });
});

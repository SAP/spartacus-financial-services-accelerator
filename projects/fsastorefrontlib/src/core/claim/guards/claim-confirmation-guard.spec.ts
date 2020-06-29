import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ClaimStatus } from '../../../occ/occ-models';
import { UserRequestService } from '../../user-request';
import { ClaimConfirmationGuard } from './claim-confirmation-guard';

const mockUserRequest = {
  requestId: 'requestId',
  requestStatus: ClaimStatus.SUBMITTED,
};

class MockRoutingService {
  go() {}
}

class MockUserRequestService {
  getUserRequest(): Observable<any> {
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

    guard = TestBed.inject(ClaimConfirmationGuard);
    service = TestBed.inject(UserRequestService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the homepage when user request is submitted`, () => {
    mockUserRequest.requestStatus = ClaimStatus.SUBMITTED;
    spyOn(service, 'getUserRequest').and.returnValue(of(mockUserRequest));
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
    spyOn(service, 'getUserRequest').and.returnValue(of(mockUserRequest));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBe(true);
    expect(routing.go).not.toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalMessageService, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { ClaimStatus } from '../../../occ/occ-models';
import { ClaimService } from '../../my-account';
import { ClaimConfirmationGuard } from './claim-confirmation-guard';

const mockUserRequest = {
  requestId: 'requestId',
  claimStatus: ClaimStatus.SUBMITTED,
};

class MockRoutingService {
  go() {}
}

class MockClaimService {
  getCurrentClaim(): any {
    return of(mockUserRequest);
  }
  getLoaded() {
    return of(true);
  }
}

class MockGlobalMessageService {
  add() {}
}

describe(`ClaimConfirmationGuard`, () => {
  let guard: ClaimConfirmationGuard;
  let service: ClaimService;
  let routing: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ClaimService,
          useClass: MockClaimService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
      imports: [RouterTestingModule],
    });

    guard = TestBed.inject(ClaimConfirmationGuard);
    service = TestBed.inject(ClaimService);
    routing = TestBed.inject(RoutingService);

    spyOn(routing, 'go').and.stub();
  });

  it(`should redirect to the homepage when claim is submitted`, () => {
    mockUserRequest.claimStatus = ClaimStatus.SUBMITTED;
    spyOn(service, 'getCurrentClaim').and.returnValue(of(mockUserRequest));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBe(false);
    expect(routing.go).toHaveBeenCalledWith({ cxRoute: 'home' });
  });

  it(`should not redirect to the homepage when user request is not submitted`, () => {
    mockUserRequest.claimStatus = ClaimStatus.OPEN;
    spyOn(service, 'getCurrentClaim').and.returnValue(of(mockUserRequest));
    let result;
    guard
      .canActivate()
      .subscribe(isActive => (result = isActive))
      .unsubscribe();
    expect(result).toBe(true);
    expect(routing.go).not.toHaveBeenCalled();
  });

  it(`should not load page when claim is not started`, () => {
    spyOn(service, 'getLoaded').and.returnValue(of(false));
    expect(routing.go).not.toHaveBeenCalled();
  });
});

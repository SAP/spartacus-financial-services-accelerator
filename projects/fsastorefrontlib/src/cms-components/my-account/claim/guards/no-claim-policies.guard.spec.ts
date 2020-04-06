import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { ClaimService } from './../../../../core/my-account/facade/claim.service';
import createSpy = jasmine.createSpy;
import { NoClaimPoliciesGuard } from './no-claim-policies.guard';

class MockRoutingService {
  go = createSpy();
}

const policyId = 'policy1';
const contractId = 'contract1';

const claimPolicies = {
  claimPoliciesData: {
    insurancePolicies: [
      {
        policyId: policyId,
        contractId: contractId,
      },
    ],
  },
  loaded: true,
};

class MockClaimService {
  getClaimPolicies(): any {
    return of(claimPolicies);
  }
}

describe('NoClaimPoliciesGuard', () => {
  let guard: NoClaimPoliciesGuard;
  let routing: RoutingService;
  let claimService: MockClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: ClaimService,
          useClass: MockClaimService,
        },
      ],
    }).compileComponents();

    guard = TestBed.get(NoClaimPoliciesGuard as Type<NoClaimPoliciesGuard>);
    routing = TestBed.get(RoutingService as Type<RoutingService>);
    claimService = TestBed.get(ClaimService as Type<ClaimService>);
  });

  it('should redirect to claims page in case there are policies', () => {
    spyOn(claimService, 'getClaimPolicies').and.returnValue(of(claimPolicies));
    guard.canActivate();
    expect(routing.go).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    guard.canActivate();

    const subscriptions = guard['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    guard.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});

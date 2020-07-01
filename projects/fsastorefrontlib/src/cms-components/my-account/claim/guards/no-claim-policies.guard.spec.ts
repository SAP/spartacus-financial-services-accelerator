import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { PolicyService } from './../../../../core/my-account/facade/policy.service';
import { of } from 'rxjs';
import { ClaimService } from './../../../../core/my-account/facade/claim.service';
import { NoClaimPoliciesGuard } from './no-claim-policies.guard';
import createSpy = jasmine.createSpy;

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

class MockPolicyService {
  loadClaimPolicies() {}
}

describe('NoClaimPoliciesGuard', () => {
  let guard: NoClaimPoliciesGuard;
  let routing: RoutingService;
  let claimService: ClaimService;
  let policyService: PolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: ClaimService,
          useClass: MockClaimService,
        },
        {
          provide: PolicyService,
          useClass: MockPolicyService,
        },
      ],
    }).compileComponents();

    guard = TestBed.inject(NoClaimPoliciesGuard);
    routing = TestBed.inject(RoutingService);
    claimService = TestBed.inject(ClaimService);
    policyService = TestBed.inject(PolicyService);
  });

  it('should redirect to claims page in case there are policies', () => {
    spyOn(claimService, 'getClaimPolicies').and.returnValue(of(claimPolicies));
    guard.canActivate();
    expect(routing.go).toHaveBeenCalled();
  });

  it('should not redirect to claims page in case there are no valid policies', () => {
    spyOn(claimService, 'getClaimPolicies').and.returnValue(of(null));
    guard.canActivate();
    expect(routing.go).not.toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    guard.canActivate();

    const subscriptions = guard['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();

    guard.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});

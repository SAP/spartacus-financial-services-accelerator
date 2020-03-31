import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { PolicyService } from './../../../../core/my-account/facade/policy.service';
import { ClaimPoliciesGuard } from './claim-policies-guard';
import { of } from 'rxjs';
import { ClaimService } from './../../../../core/my-account/facade/claim.service';
import createSpy = jasmine.createSpy;

class MockPolicyService {
  loadClaimPolicies() {}
}

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

describe('ClaimPoliciesGuard', () => {
  let guard: ClaimPoliciesGuard;
  let routing: RoutingService;
  let policyService: MockPolicyService;
  let claimService: MockClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: PolicyService,
          useClass: MockPolicyService,
        },
        {
          provide: ClaimService,
          useClass: MockClaimService,
        },
      ],
    }).compileComponents();

    guard = TestBed.get(ClaimPoliciesGuard as Type<ClaimPoliciesGuard>);
    routing = TestBed.get(RoutingService as Type<RoutingService>);
    policyService = TestBed.get(PolicyService as Type<PolicyService>);
    claimService = TestBed.get(ClaimService as Type<ClaimService>);
  });

  it('should redirect to no claims page in case there are no policies', () => {
    spyOn(claimService, 'getClaimPolicies').and.returnValue(
      of({
        claimPoliciesData: {},
        loaded: true,
      })
    );
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

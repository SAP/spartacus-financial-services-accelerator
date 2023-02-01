import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClaimAdapter } from './claim.adapter';
import { ClaimConnector } from './claim.connector';
import createSpy = jasmine.createSpy;

class MockClaimAdapter extends ClaimAdapter {
  getClaims = createSpy('ClaimAdapter.getClaims').and.callFake(userId =>
    of('getClaims' + userId)
  );

  getClaim = createSpy('ClaimAdapter.getClaim').and.callFake(
    (userId, claimId) => of('getClaim' + userId + claimId)
  );
  deleteClaim = createSpy('ClaimAdapter.deleteClaim').and.callFake(
    (userId, claimId) => of('deleteClaim' + userId + claimId)
  );
  createClaim = createSpy('ClaimAdapter.createClaim').and.callFake(
    (userId, policyId, contractId) =>
      of('createClaim' + userId + policyId + contractId)
  );

  updateClaim = createSpy('ClaimAdapter.updateClaim').and.callFake(
    (userId, claimId, claimData) =>
      of('updateClaim' + userId + claimId + claimData)
  );
}
const user = 'user';
const claim = 'claimId';
const policy = 'policyId';
const contract = 'contractId';

describe('ClaimConnector', () => {
  let claimConnector: ClaimConnector;
  let claimAdapter: ClaimAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ClaimAdapter, useClass: MockClaimAdapter }],
    });

    claimConnector = TestBed.inject(ClaimConnector);
    claimAdapter = TestBed.inject(ClaimAdapter);
  });

  it('should be created', () => {
    expect(claimConnector).toBeTruthy();
  });
  it('should call adapter for getClaims', () => {
    claimConnector.getClaims(user);
    expect(claimAdapter.getClaims).toHaveBeenCalledWith(user);
  });
  it('should call adapter for getClaim', () => {
    claimConnector.getClaim(user, claim);
    expect(claimAdapter.getClaim).toHaveBeenCalledWith(user, claim);
  });
  it('should call adapter for createClaim', () => {
    claimConnector.createClaim(user, policy, contract);
    expect(claimAdapter.createClaim).toHaveBeenCalledWith(
      user,
      policy,
      contract
    );
  });
  it('should call adapter for deleteClaim', () => {
    claimConnector.deleteClaim(user, claim);
    expect(claimAdapter.deleteClaim).toHaveBeenCalledWith(user, claim);
  });
  it('should call adapter for updateClaim', () => {
    claimConnector.updateClaim(user, claim, {});
    expect(claimAdapter.updateClaim).toHaveBeenCalledWith(user, claim, {});
  });
});

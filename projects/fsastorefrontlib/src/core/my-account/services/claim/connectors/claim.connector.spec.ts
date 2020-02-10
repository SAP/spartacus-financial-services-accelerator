import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import createSpy = jasmine.createSpy;
import { ClaimAdapter } from './claim.adapter';
import { ClaimConnector } from './claim.connector';

class MockClaimAdapter implements ClaimAdapter {
  getClaims = createSpy('ClaimAdapter.getClaims').and.callFake(userId =>
    of('getClaims' + userId)
  );
  deleteClaim = createSpy('ClaimAdapter.deleteClaim').and.callFake(
    (userId, claimId) => of('deleteClaim' + userId + claimId)
  );
  createClaim = createSpy('ClaimAdapter.createClaim').and.callFake(
    (userId, policyId, contractId) =>
      of('createClaim' + userId + policyId + contractId)
  );
  submitClaim = createSpy('ClaimAdapter.submitClaim').and.callFake(
    (userId, claimId) => of('submitClaim' + userId + claimId)
  );
  updateClaim = createSpy('ClaimAdapter.updateClaim').and.callFake(
    (userId, claimId, claimData) =>
      of('updateClaim' + userId + claimId + claimData)
  );
}
const user = 'user';

describe('PolicyConnector', () => {
  let claimConnector: ClaimConnector;
  let claimAdapter: ClaimAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ClaimAdapter, useClass: MockClaimAdapter }],
    });

    claimConnector = TestBed.get(ClaimConnector as Type<ClaimConnector>);
    claimAdapter = TestBed.get(ClaimAdapter as Type<ClaimAdapter>);
  });

  it('should be created', () => {
    expect(claimConnector).toBeTruthy();
  });
  it('should call adapter for getClaims', () => {
    claimConnector.getClaims(user);
    expect(claimAdapter.getClaims).toHaveBeenCalledWith(user);
  });
  it('should call adapter for createClaim', () => {
    claimConnector.createClaim(user, 'policyId', 'contractId');
    expect(claimAdapter.createClaim).toHaveBeenCalledWith(
      user,
      'policyId',
      'contractId'
    );
  });
  it('should call adapter for deleteClaim', () => {
    claimConnector.deleteClaim(user, 'claimId');
    expect(claimAdapter.deleteClaim).toHaveBeenCalledWith(user, 'claimId');
  });
  it('should call adapter for submitClaim', () => {
    claimConnector.submitClaim(user, 'claimId');
    expect(claimAdapter.submitClaim).toHaveBeenCalledWith(user, 'claimId');
  });
  it('should call adapter for updateClaim', () => {
    claimConnector.updateClaim(user, 'claimId', {});
    expect(claimAdapter.updateClaim).toHaveBeenCalledWith(user, 'claimId', {});
  });
});

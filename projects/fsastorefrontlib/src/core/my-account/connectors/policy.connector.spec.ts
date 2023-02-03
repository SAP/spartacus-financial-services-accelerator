import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PolicyAdapter } from './policy.adapter';
import { PolicyConnector } from './policy.connector';
import createSpy = jasmine.createSpy;

class MockPolicyAdapter implements PolicyAdapter {
  getPolicies = createSpy('PolicyAdapter.getPolicies').and.callFake(() =>
    of('getCalculatedProductData')
  );
  getPoliciesByCategory = createSpy(
    'PolicyAdapter.getPoliciesByCategory'
  ).and.callFake((userId, policyCategoryCode) =>
    of('getPoliciesByCategory' + userId + policyCategoryCode)
  );
  getPolicy = createSpy('PolicyAdapter.getPolicy').and.callFake(
    (userId, policyId, contractId) =>
      of('getPolicy' + userId + policyId + contractId)
  );
  getPremiumCalendar = createSpy(
    'PolicyAdapter.getPremiumCalendar'
  ).and.callFake(userId => of('getPremiumCalendar' + userId));
}
const user = 'user';
const category = 'categoryId';
const policy = 'policyId';
const contract = 'contractId';

describe('PolicyConnector', () => {
  let policyConnector: PolicyConnector;
  let policyAdapter: PolicyAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PolicyAdapter, useClass: MockPolicyAdapter }],
    });

    policyConnector = TestBed.inject(PolicyConnector);
    policyAdapter = TestBed.inject(PolicyAdapter);
  });

  it('should be created', () => {
    expect(policyConnector).toBeTruthy();
  });
  it('should call adapter for getPolicies', () => {
    policyConnector.getPolicies(user);
    expect(policyAdapter.getPolicies).toHaveBeenCalledWith(user);
  });
  it('should call adapter for getPoliciesByCategory', () => {
    policyConnector.getPoliciesByCategory(user, category);
    expect(policyAdapter.getPoliciesByCategory).toHaveBeenCalledWith(
      user,
      category
    );
  });
  it('should call adapter for getPolicy', () => {
    policyConnector.getPolicy(user, policy, contract);
    expect(policyAdapter.getPolicy).toHaveBeenCalledWith(
      user,
      policy,
      contract
    );
  });
  it('should call adapter for getPremiumCalendar', () => {
    policyConnector.getPremiumCalendar(user);
    expect(policyAdapter.getPremiumCalendar).toHaveBeenCalledWith(user);
  });
});

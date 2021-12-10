import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConsentAdapter } from './consent.adapter';
import { ConsentConnector } from './consent.connector';
import createSpy = jasmine.createSpy;

class MockConsentAdapter extends ConsentAdapter {
  getConsents = createSpy('ConsentAdapter.getConsents').and.callFake(userId =>
    of('getConsents' + userId)
  );
  getOBOCustomerList = createSpy(
    'ConsentAdapter.getOBOCustomerList'
  ).and.callFake(userId => of('getOBOCustomerList' + userId));
  getOBOCustomer = createSpy(
    'ConsentAdapter.getOBOCustomer'
  ).and.callFake((userId, customerId) =>
    of('getOBOCustomer' + userId + customerId)
  );
  getQuotesForOBOCustomer = createSpy(
    'ConsentAdapter.getQuotesForOBOCustomer'
  ).and.callFake((userId, customerId) =>
    of('getQuotesForOBOCustomer' + userId + customerId)
  );
  getPoliciesForOBOCustomer = createSpy(
    'ConsentAdapter.getPoliciesForOBOCustomer'
  ).and.callFake((userId, customerId) =>
    of('getPoliciesForOBOCustomer' + userId + customerId)
  );
  getClaimsForOBOCustomer = createSpy(
    'ConsentAdapter.getClaimsForOBOCustomer'
  ).and.callFake((userId, customerId) =>
    of('getClaimsForOBOCustomer' + userId + customerId)
  );
}

const user = 'user';
const mockCustomerId = 'customerId';

describe('ConsentConnector', () => {
  let consentConnector: ConsentConnector;
  let consentAdapter: ConsentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ConsentAdapter, useClass: MockConsentAdapter }],
    });

    consentConnector = TestBed.inject(ConsentConnector);
    consentAdapter = TestBed.inject(ConsentAdapter);
  });

  it('should be created', () => {
    expect(consentConnector).toBeTruthy();
  });
  it('should call adapter for getConsents', () => {
    consentConnector.getConsents(user);
    expect(consentAdapter.getConsents).toHaveBeenCalledWith(user);
  });
  it('should call adapter to get OBO Customer List', () => {
    consentConnector.getOBOCustomerList(user);
    expect(consentAdapter.getOBOCustomerList).toHaveBeenCalledWith(user);
  });
  it('should call adapter to get OBO Customer', () => {
    consentConnector.getOBOCustomer(user, mockCustomerId);
    expect(consentAdapter.getOBOCustomer).toHaveBeenCalledWith(
      user,
      mockCustomerId
    );
  });
  it('should call adapter to get quotes for OBO Customer', () => {
    consentConnector.getQuotesForOBOCustomer(user, mockCustomerId);
    expect(consentAdapter.getQuotesForOBOCustomer).toHaveBeenCalledWith(
      user,
      mockCustomerId
    );
  });
  it('should call adapter to get policies for OBO Customer', () => {
    consentConnector.getPoliciesForOBOCustomer(user, mockCustomerId);
    expect(consentAdapter.getPoliciesForOBOCustomer).toHaveBeenCalledWith(
      user,
      mockCustomerId
    );
  });
  it('should call adapter to get claims for OBO Customer', () => {
    consentConnector.getClaimsForOBOCustomer(user, mockCustomerId);
    expect(consentAdapter.getClaimsForOBOCustomer).toHaveBeenCalledWith(
      user,
      mockCustomerId
    );
  });
});

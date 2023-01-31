import { TestBed } from '@angular/core/testing';
import { Address } from '@spartacus/core';
import { of } from 'rxjs';
import { FSSearchConfig } from '../services/inbox-data.service';
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
  getOBOCustomer = createSpy('ConsentAdapter.getOBOCustomer').and.callFake(
    (userId, customerId) => of('getOBOCustomer' + userId + customerId)
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

  transferCartToOboCustomer = createSpy(
    'ConsentAdapter.transferCartToOboCustomer'
  ).and.callFake((cartId, userId, oboUser) =>
    of('transferCartToOboCustomer' + cartId + userId + oboUser)
  );
  createAddressForUser = createSpy(
    'ConsentAdapter.createAddressForUser'
  ).and.callFake((userId, oboCustomerId, userAddress) =>
    of('createAddressForUser' + userId + oboCustomerId + userAddress)
  );
  createOBOCustomer = createSpy(
    'ConsentAdapter.createOBOCustomer'
  ).and.callFake((consentHolder, details) =>
    of('createOBOCustomer' + consentHolder + details)
  );
  updateOBOPermission = createSpy(
    'ConsentAdapter.updateOBOPermission'
  ).and.callFake(
    (userId, oboConsentHolderEmail, oboPermission, oboPermissionVal) =>
      of(
        'updateOBOPermission' +
          userId +
          oboConsentHolderEmail +
          oboPermission +
          oboPermissionVal
      )
  );
  updateAddressForUser = createSpy(
    'ConsentAdapter.updateAddressForUser'
  ).and.callFake((userId, oboCustomerId, addressCode, addressObject) =>
    of('updateAddressForUser' + userId + oboCustomerId + addressCode + addressObject)
  );
}

const user = 'user';
const mockCustomerId = 'customerId';
const cartCode = 'cartCode';
const oboCustomer = 'customerToTransferCartUid';
const addressId = 'addressId';
const address: Address = {
  companyName: 'Test Company',
  defaultAddress: true,
};
const oboConsentHolderUid = 'test@test.com';
const oboPermissionName = 'testPermission';
const oboPermissionValue = true;
const searchConfig: FSSearchConfig = {
  currentPage: 0,
};

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
    consentConnector.getOBOCustomerList(user, searchConfig);
    expect(consentAdapter.getOBOCustomerList).toHaveBeenCalledWith(
      user,
      searchConfig
    );
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
  it('should call adapter to transfer cart', () => {
    consentConnector.transferCart(cartCode, user, oboCustomer);
    expect(consentAdapter.transferCartToOboCustomer).toHaveBeenCalledWith(
      cartCode,
      user,
      oboCustomer
    );
  });
  it('should call adapter to create address for user', () => {
    consentConnector.createAddressForUser(user, oboCustomer, address);
    expect(consentAdapter.createAddressForUser).toHaveBeenCalledWith(
      user,
      oboCustomer,
      address
    );
  });

  it('should call adapter to update address for user', () => {
    consentConnector.updateAddressForUser(
      user,
      oboCustomer,
      addressId,
      address
    );
    expect(consentAdapter.updateAddressForUser).toHaveBeenCalledWith(
      user,
      oboCustomer,
      addressId,
      address
    );
  });

  it('should call adapter to create customer', () => {
    const customerDetails = {
      firstName: 'Test First Name',
      lastName: 'Test Last Name',
      email: 'test@email.com',
    };
    consentConnector.createOBOCustomer(user, customerDetails);
    expect(consentAdapter.createOBOCustomer).toHaveBeenCalledWith(
      user,
      customerDetails
    );
  });

  it('should call adapter to update OBO permissions', () => {
    consentConnector.updateOBOPermission(
      user,
      oboConsentHolderUid,
      oboPermissionName,
      oboPermissionValue
    );
    expect(consentAdapter.updateOBOPermission).toHaveBeenCalledWith(
      user,
      oboConsentHolderUid,
      oboPermissionName,
      oboPermissionValue
    );
  });
});

import { TestBed } from '@angular/core/testing';
import { Address } from '@spartacus/core';
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
  transferCartToOboCustomer = createSpy(
    'ConsentAdapter.transferCartToOboCustomer'
  ).and.callFake((cartId, userId, oboCustomer) =>
    of('transferCartToOboCustomer' + cartId + userId + oboCustomer)
  );
  createAddressForUser = createSpy(
    'ConsentAdapter.createAddressForUser'
  ).and.callFake((userId, oboCustomerId, address) =>
    of('createAddressForUser' + userId + oboCustomerId + address)
  );
}

const user = 'user';
const cartCode = 'cartCode';
const oboCustomer = 'customerToTransferCartUid';
const address: Address = {
  companyName: 'msg Global Digital',
  defaultAddress: true,
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
    consentConnector.getOBOCustomerList(user);
    expect(consentAdapter.getOBOCustomerList).toHaveBeenCalledWith(user);
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
});

import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CheckoutAdapter } from './checkout.adapter';
import { CheckoutConnector } from './checkout.connector';
import createSpy = jasmine.createSpy;

class MockCheckoutAdapter implements CheckoutAdapter {
  setIdentificationType = createSpy(
    'CheckoutAdapter.setIdentificationType'
  ).and.callFake((identificationType, cartId, userId) =>
    of('setIdentificationType' + identificationType + cartId + userId)
  );
}
const user = 'user';
const cart = 'cartId';
const identification = 'video';

describe('CheckoutConnector', () => {
  let checkoutConnector: CheckoutConnector;
  let checkoutAdapter: CheckoutAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CheckoutAdapter, useClass: MockCheckoutAdapter }],
    });

    checkoutConnector = TestBed.get(
      CheckoutConnector as Type<CheckoutConnector>
    );
    checkoutAdapter = TestBed.get(CheckoutAdapter as Type<CheckoutAdapter>);
  });

  it('should be created', () => {
    expect(checkoutConnector).toBeTruthy();
  });
  it('should call adapter for getUserRequest', () => {
    checkoutConnector.setIdentificationType(identification, cart, user);
    expect(checkoutAdapter.setIdentificationType).toHaveBeenCalledWith(
      identification,
      cart,
      user
    );
  });
});

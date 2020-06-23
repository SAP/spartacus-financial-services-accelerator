import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartAdapter } from './cart.adapter';
import { CartConnector } from './cart.connector';
import createSpy = jasmine.createSpy;

class MockCartAdapter implements CartAdapter {
  addToCart = createSpy('CartAdapter.addToCart').and.callFake(
    (userId, cartId, productCode, quantity, entryNum) =>
      of('addToCart' + userId + cartId + productCode + quantity + entryNum)
  );
  startBundle = createSpy('CartAdapter.startBundle').and.callFake(
    (userId, cartId, productCode, bundleTemplateId, quantity, pricingData) =>
      of(
        'addToCart' +
          userId +
          cartId +
          productCode +
          bundleTemplateId +
          quantity +
          pricingData
      )
  );
}

const user = 'user';
const cart = 'cart';
const product = 'productCode';
const bundleTemplate = 'bundleId';
const qty = 1;
const entry = '2';

describe('CartConnector', () => {
  let cartConnector: CartConnector;
  let cartAdapter: CartAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CartAdapter, useClass: MockCartAdapter }],
    });

    cartConnector = TestBed.inject(CartConnector);
    cartAdapter = TestBed.inject(CartAdapter);
  });

  it('should be created', () => {
    expect(cartConnector).toBeTruthy();
  });

  it('should call adapter for addToCart', () => {
    cartConnector.addToCart(user, cart, product, qty, entry);
    expect(cartAdapter.addToCart).toHaveBeenCalledWith(
      user,
      cart,
      product,
      qty,
      entry
    );
  });

  it('should call adapter for startBundle', () => {
    cartConnector.startBundle(user, cart, product, bundleTemplate, qty, {});
    expect(cartAdapter.startBundle).toHaveBeenCalledWith(
      user,
      cart,
      product,
      bundleTemplate,
      qty,
      {}
    );
  });
});

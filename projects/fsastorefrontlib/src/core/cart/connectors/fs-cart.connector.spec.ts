import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartModification } from '@spartacus/core';
import { Type } from '@angular/core';
import { FSCartAdapter } from './fs-cart.adapter';
import { FsCartConnector } from './fs-cart.connector';
import createSpy = jasmine.createSpy;

class MockFSCartAdapter implements FSCartAdapter {
  addToCart = createSpy('FSCartAdapter.addToCart').and.callFake(
    (userId, cartId, productCode, quantity, entryNum) =>
      of('addToCart' + userId + cartId + productCode + quantity + entryNum)
  );
  startBundle = createSpy('FSCartAdapter.startBundle').and.callFake(
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

describe('FsCartConnector', () => {
  let fsCartConnector: FsCartConnector;
  let fsCartAdapter: FSCartAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FSCartAdapter, useClass: MockFSCartAdapter }],
    });

    fsCartConnector = TestBed.get(FsCartConnector as Type<FsCartConnector>);
    fsCartAdapter = TestBed.get(FSCartAdapter as Type<FSCartAdapter>);
  });

  it('should be created', () => {
    expect(fsCartConnector).toBeTruthy();
  });

  it('should call adapter for addToCart', () => {
    fsCartConnector.addToCart(user, cart, product, qty, entry);
    expect(fsCartAdapter.addToCart).toHaveBeenCalledWith(
      user,
      cart,
      product,
      qty,
      entry
    );
  });

  it('should call adapter for startBundle', () => {
    fsCartConnector.startBundle(user, cart, product, bundleTemplate, qty, {});
    expect(fsCartAdapter.startBundle).toHaveBeenCalledWith(
      user,
      cart,
      product,
      bundleTemplate,
      qty,
      {}
    );
  });
});

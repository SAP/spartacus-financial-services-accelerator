import { Store, StoreModule, select } from '@ngrx/store';

import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { TestBed } from '@angular/core/testing';

describe('Cart selectors', () => {
  let store: Store<fromReducers.CartState>;

  const testCart: any = {
    code: 'xxx',
    guid: 'xxx',
    total_items: 0,
    entries: [{ entryNumber: 0, product: { code: '1234' } }],
    total_price: {
      currency_iso: 'USD',
      value: 0
    },
    total_price_with_tax: {
      currency_iso: 'USD',
      value: 0
    }
  };

  const testEmptyCart: any = {
    code: 'xxx',
    guid: 'xxx',
    total_items: 0,
    total_price: {
      currency_iso: 'USD',
      value: 0
    },
    total_price_with_tax: {
      currency_iso: 'USD',
      value: 0
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getActiveCart', () => {
    it('should return the active cart from the state', () => {
      let result: any;
      store
        .pipe(select(fromSelectors.getActiveCart))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.CreateCartSuccess(testEmptyCart));
      expect(result).toEqual(testEmptyCart);
    });
  });

  describe('getRefresh', () => {
    it('should return the refresh value', () => {
      let result: any;
      store
        .pipe(select(fromSelectors.getRefresh))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(
        new fromActions.AddEntrySuccess({
          userId: 'testUserId',
          cartId: 'testCartId',
          productCode: 'testProductCode',
          quantity: 1
        })
      );
      expect(result).toEqual(true);
    });
  });

  describe('getLoaded', () => {
    it('should return the loaded value', () => {
      let result: any;
      store
        .pipe(select(fromSelectors.getLoaded))
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.CreateCart(testEmptyCart));
      expect(result).toEqual(false);
    });
  });

  describe('getEntriesMap', () => {
    it('should return the cart entries in map', () => {
      let result: any;
      store
        .pipe(select(fromSelectors.getEntriesMap))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadCartSuccess(testCart));

      expect(result).toEqual({
        '1234': { entryNumber: 0, product: { code: '1234' } }
      });
    });
  });

  describe('getEntrySelectorFactory', () => {
    it('should return entry by productCode', () => {
      let result;

      store
        .pipe(select(fromSelectors.getEntrySelectorFactory('1234')))
        .subscribe(value => (result = value));

      expect(result).toEqual(undefined);

      store.dispatch(new fromActions.LoadCartSuccess(testCart));

      expect(result).toEqual({ entryNumber: 0, product: { code: '1234' } });
    });
  });

  describe('getEntriesList', () => {
    it('should return the list of entries', () => {
      let result: any;
      store
        .pipe(select(fromSelectors.getEntries))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.LoadCartSuccess(testCart));

      expect(result).toEqual([{ entryNumber: 0, product: { code: '1234' } }]);
    });
  });
});

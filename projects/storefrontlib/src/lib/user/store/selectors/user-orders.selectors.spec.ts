import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from './../../../routing/store';

const mockUserOrders: any = {
  orders: [],
  pagination: {
    currentPage: 1,
    pageSize: 5
  },
  sort: [{ code: 'byPage' }]
};

describe('User Orders Selectors', () => {
  let store: Store<fromReducers.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          user: combineReducers(fromReducers.getReducers())
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe('getOrderState', () => {
    it('should return the Order state from the store', () => {
      let result;
      store
        .pipe(select(fromSelectors.getOrdersState))
        .subscribe(value => (result = value));
      expect(result).toEqual({
        orders: {
          orders: [],
          pagination: {},
          sort: []
        },
        loading: false,
        loaded: false
      });
    });
  });

  describe('getOrders', () => {
    it('should return a user Orders', () => {
      let result;
      store
        .pipe(select(fromSelectors.getOrders))
        .subscribe(value => (result = value));
      expect(result).toEqual({
        orders: [],
        pagination: {},
        sort: []
      });

      store.dispatch(new fromActions.LoadUserOrdersSuccess(mockUserOrders));
      expect(result).toEqual(mockUserOrders);
    });
  });
});

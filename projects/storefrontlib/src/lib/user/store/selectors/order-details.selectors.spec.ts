import { TestBed } from '@angular/core/testing';
import { Store, StoreModule, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

describe('Order Details Selectors', () => {
  let store: Store<fromReducers.UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('user', fromReducers.getReducers())
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe('getOrderDetails', () => {
    it('should return the Order state from the store', () => {
      let result;
      store
        .pipe(select(fromSelectors.getOrderDetails))
        .subscribe(value => (result = value));
      expect(result).not.toBeNull();
    });
  });
});

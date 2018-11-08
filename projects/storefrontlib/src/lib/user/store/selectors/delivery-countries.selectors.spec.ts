import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule, select } from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';
import * as fromRoot from './../../../routing/store';

describe('Delivery Countries Selectors', () => {
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

  describe('getAllDeliveryCountries', () => {
    it('should return all delivery countries', () => {
      const mockCountries = [
        {
          isocode: 'AL',
          name: 'Albania'
        },
        {
          isocode: 'AD',
          name: 'Andorra'
        }
      ];

      let result;
      store
        .pipe(select(fromSelectors.getAllDeliveryCountries))
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(
        new fromActions.LoadDeliveryCountriesSuccess(mockCountries)
      );

      expect(result).toEqual(mockCountries);
    });
  });

  describe('countrySelectorFactory', () => {
    it('should return title', () => {
      const isocode = 'AL';
      const mockCountries = [
        {
          isocode: 'AL',
          name: 'Albania'
        },
        {
          isocode: 'AD',
          name: 'Andorra'
        }
      ];

      let result;

      store
        .pipe(select(fromSelectors.countrySelectorFactory(isocode)))
        .subscribe(value => (result = value));

      store.dispatch(
        new fromActions.LoadDeliveryCountriesSuccess(mockCountries)
      );
      expect(result).toEqual(mockCountries[0]);
    });
  });
});

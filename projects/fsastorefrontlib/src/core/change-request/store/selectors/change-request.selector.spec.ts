import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../reducers/index';
import { StateWithUser } from '@spartacus/core';
import * as fromSelectors from './change-request.selector';
import * as fromActions from './../actions/change-request.action';

describe('Change Request Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('changeRequests', fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithUser>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getChangeRequest', () => {
    it('should return created change request', () => {
      const mockChangeRequest = {
        requestId: 'requestId',
      };

      let result;
      store
        .pipe(select(fromSelectors.getChangeRequest))
        .subscribe(value => (result = value));
      expect(result).toEqual({});

      store.dispatch(
        new fromActions.CreateChangeRequestSuccess(mockChangeRequest)
      );
      expect(result).toEqual(mockChangeRequest);
    });
  });
});

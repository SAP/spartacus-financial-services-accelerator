import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { StateWithChangeRequest } from '../change-request-state';
import * as fromReducers from '../reducers/index';
import * as fromActions from './../actions/change-request.action';
import * as fromSelectors from './change-request.selector';

describe('Change Request Selectors', () => {
  let store: Store<StateWithChangeRequest>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('changeRequests', fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
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

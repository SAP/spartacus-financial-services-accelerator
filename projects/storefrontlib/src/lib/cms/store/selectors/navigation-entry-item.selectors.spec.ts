import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, select } from '@ngrx/store';

import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';

describe('Navigation Entry Items Selectors', () => {
  let store: Store<fromReducers.CmsState>;

  const mockComponents = [
    { uid: 'comp1', typeCode: 'SimpleBannerComponent1' },
    { uid: 'comp2', typeCode: 'SimpleBannerComponent2' }
  ];

  const mockPayload = { nodeId: 'testId', components: mockComponents };

  const mockResult = {
    testId: {
      comp1_AbstractCMSComponent: {
        uid: 'comp1',
        typeCode: 'SimpleBannerComponent1'
      },
      comp2_AbstractCMSComponent: {
        uid: 'comp2',
        typeCode: 'SimpleBannerComponent2'
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromReducers.getReducers())
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getNavigationEntryItems', () => {
    it('should return components', () => {
      let result;

      store
        .pipe(select(fromSelectors.getNavigationEntryItems))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadNavigationItemsSuccess(mockPayload));

      expect(result).toEqual(mockResult);
    });
  });

  describe('itemsSelectorFactory', () => {
    it('should return components by uid', () => {
      let result;

      store
        .pipe(select(fromSelectors.itemsSelectorFactory('testId')))
        .subscribe(value => (result = value));

      store.dispatch(new fromActions.LoadNavigationItemsSuccess(mockPayload));

      expect(result).toEqual(mockResult.testId);
    });
  });
});

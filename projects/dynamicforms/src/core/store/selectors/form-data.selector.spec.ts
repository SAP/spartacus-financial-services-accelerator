import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromActions from '../actions/form-data.action';
import * as fromReducers from '../reducers/index';
import { StateWithForm } from '../state';
import { YFormData } from './../../models/form-occ.models';
import * as fromSelectors from './form-data.selector';

const mockFormData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content: '{"testContent": "content"}',
};

describe('Form Data Selectors', () => {
  let store: Store<StateWithForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithForm>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getFormData', () => {
    it('should return loaded form data', () => {
      let result;
      store
        .pipe(select(fromSelectors.getFormData))
        .subscribe(value => (result = value));
      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadFormDataSuccess(mockFormData));

      expect(result).toEqual(mockFormData);
    });
  });
});

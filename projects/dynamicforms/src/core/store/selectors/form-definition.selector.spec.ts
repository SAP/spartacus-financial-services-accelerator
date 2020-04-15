import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromReducers from '../reducers/index';
import * as fromSelectors from './form-definition.selector';
import * as fromActions from '../actions/form-definition.action';
import { StateWithFormDefinition } from '../form-definition-state';

describe('Form Definition Selectors', () => {
  let store: Store<StateWithFormDefinition>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('formDefinition', fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store as Type<Store<StateWithFormDefinition>>);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getFormDefinition', () => {
    it('should return loaded form definition', () => {
      const formDefinition = {
        formId: 'formId',
      };

      let result;
      store
        .pipe(select(fromSelectors.getFormDefinition))
        .subscribe(value => (result = value));
      expect(result).toEqual({});

      store.dispatch(new fromActions.LoadFormDefinitionSuccess(formDefinition));
      expect(result).toEqual(formDefinition);
    });
  });
});

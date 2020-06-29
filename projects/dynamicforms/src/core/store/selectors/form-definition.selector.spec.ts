import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromActions from '../actions/form-definition.action';
import * as fromReducers from '../reducers/index';
import { StateWithForm } from '../state';
import * as fromSelectors from './form-definition.selector';

describe('Form Definition Selectors', () => {
  let store: Store<StateWithForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', fromReducers.getReducers()),
      ],
    });

    store = TestBed.inject(Store);
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

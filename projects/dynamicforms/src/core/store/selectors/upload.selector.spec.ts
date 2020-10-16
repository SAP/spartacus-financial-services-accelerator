import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import * as fromActions from '../actions/file.action';
import * as fromReducers from '../reducers/index';
import { StateWithForm } from '../state';
import * as fromSelectors from './upload.selector';

describe('Upload Selectors', () => {
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

  describe('getUploadFiles', () => {
    it('should return uploaded files', () => {
      const body = {
        files: [],
      };
      let result;
      store
        .pipe(select(fromSelectors.getUploadFiles))
        .subscribe(value => (result = value));
      expect(result).toEqual({ files: [] });

      store.dispatch(new fromActions.UploadFileSuccess(body));

      expect(result).toEqual(body);
    });
  });
});

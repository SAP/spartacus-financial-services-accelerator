import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { FormConnector } from '../../connectors/form-connector';
import { FormDataStorageService } from '../../services/storage/form-data-storage.service';
import * as fromActions from '../actions';
import { YFormData } from './../../models/form-occ.models';
import * as fromUserReducers from './../../store/reducers/index';
import * as fromEffects from './form-data.effect';

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

class MockFormConnector {
  getFormData() {
    return of(formData);
  }
  saveFormData() {
    return of(formData);
  }
}

class MockFromDataStorageService {
  clearFormDataLocalStorage() { }
}

describe('Form Data Effects', () => {
  let actions$: Observable<fromActions.FormDataAction>;
  let effects: fromEffects.FormDataEffects;
  let mockFormConnector: MockFormConnector;
  let mockFromDataStorageService: MockFromDataStorageService;

  beforeEach(() => {
    mockFormConnector = new MockFormConnector();
    mockFromDataStorageService = new MockFromDataStorageService();
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', fromUserReducers.getReducers()),
      ],
      providers: [
        {
          provide: FormConnector,
          useValue: mockFormConnector,
        },
        {
          provide: FormDataStorageService,
          useValue: mockFromDataStorageService,
        },
        fromEffects.FormDataEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(fromEffects.FormDataEffects);
  });

  describe('loadFormData$', () => {
    it('should load form data', () => {
      const action = new fromActions.LoadFormData({
        formDataId: formData.id,
      });
      const completion = new fromActions.LoadFormDataSuccess(formData);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadFormData$).toBeObservable(expected);
    });

    it('should fail to load form data', () => {
      spyOn(mockFormConnector, 'getFormData').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.LoadFormData({
        formDataId: formData.id,
      });
      const completion = new fromActions.LoadFormDataFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadFormData$).toBeObservable(expected);
    });
  });

  describe('saveFormData$', () => {
    it('should save form data', () => {
      const action = new fromActions.SaveFormData({
        formData: formData,
      });
      const completion = new fromActions.SaveFormDataSuccess(formData);
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.saveFormData$).toBeObservable(expected);
    });

    it('should fail to save form data', () => {
      spyOn(mockFormConnector, 'saveFormData').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.SaveFormData({
        formData: formData,
      });
      const completion = new fromActions.SaveFormDataFail(
        JSON.stringify('Error')
      );
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.saveFormData$).toBeObservable(expected);
    });

    it('should call clearFormDataLocalStorage', async () => {
      const spy = spyOn(
        mockFromDataStorageService,
        'clearFormDataLocalStorage'
      );
      const action = new AuthActions.Logout();
      actions$ = hot('-a', { a: action });
      effects.clearFormData$.subscribe(() => {
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});

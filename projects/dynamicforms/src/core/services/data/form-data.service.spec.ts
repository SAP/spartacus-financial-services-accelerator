import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  AuthService,
  I18nTestingModule,
  OCC_USER_ID_ANONYMOUS,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import * as fromAction from '../../store/actions';
import { reducerProvider, reducerToken } from '../../store/reducers';
import { YFormData, YFormDefinition } from './../../models/form-occ.models';
import { StateWithForm } from './../../store/state';
import { FormDataService } from './form-data.service';

const applicationId = 'applicationId';
const formDefinitionId = 'formDefinitionId';
const category = 'category';

const mockDefinition: YFormDefinition = {
  formId: formDefinitionId,
  content: '{testDef: testDef}',
  applicationId: applicationId,
};

const mockFormData: YFormData = {
  id: 'formDataId',
  content: 'test',
  formDefinition: {
    formId: formDefinitionId,
    applicationId: applicationId,
  },
};

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

describe('FormDataService', () => {
  let service: FormDataService;
  let store: Store<StateWithForm>;
  let mockUserIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', reducerToken),
      ],
      providers: [
        FormDataService,
        reducerProvider,
        { provide: UserIdService, useClass: MockUserIdService },
      ],
    });

    service = TestBed.inject(FormDataService);
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
    mockUserIdService = TestBed.inject(UserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get form data', () => {
    store.dispatch(new fromAction.LoadFormDataSuccess(mockFormData));
    let response;
    service
      .getFormData()
      .subscribe(formData => {
        response = formData;
      })
      .unsubscribe();
    expect(response).toEqual(mockFormData);
  });

  it('should get definition', () => {
    store.dispatch(new fromAction.LoadFormDefinitionSuccess(mockDefinition));
    let response;
    service
      .getFormDefinition()
      .subscribe(formDefinition => {
        response = formDefinition;
      })
      .unsubscribe();
    expect(response).toEqual(mockDefinition);
  });

  it('should load form definition by id', () => {
    service.loadFormDefinition(applicationId, formDefinitionId);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadFormDefinition({
        applicationId: applicationId,
        formDefinitionId: formDefinitionId,
      })
    );
  });
  it('should load form definition by category', () => {
    service.loadFormDefinitions(category, 'PERSONAL_DETAILS');

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadFormDefinition({
        categoryCode: category,
        formDefinitionType: 'PERSONAL_DETAILS',
      })
    );
  });
  it('should load form data', () => {
    service.loadFormData('formDataId');

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadFormData({
        formDataId: mockFormData.id,
        userId: OCC_USER_ID_CURRENT,
      })
    );
  });

  it('should save form data', () => {
    service.saveFormData(mockFormData);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SaveFormData({
        formData: mockFormData,
        userId: OCC_USER_ID_CURRENT,
      })
    );
  });

  it('should save form data when user is anonymous', () => {
    spyOn(mockUserIdService, 'getUserId').and.returnValue(
      of(OCC_USER_ID_ANONYMOUS)
    );
    service.saveFormData(mockFormData);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SaveFormData({
        formData: mockFormData,
        userId: OCC_USER_ID_ANONYMOUS,
      })
    );
  });
});

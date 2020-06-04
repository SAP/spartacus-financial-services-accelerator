import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import * as fromAction from '../../store/actions';
import { reducerProvider, reducerToken } from '../../store/reducers';
import { YFormData, YFormDefinition } from './../../models/form-occ.models';
import { StateWithForm } from './../../store/state';
import { FormDataService } from './form-data.service';
import { FormDefinitionType } from '@fsa/storefront';

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

describe('FormDataService', () => {
  let service: FormDataService;
  let store: Store<StateWithForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', reducerToken),
      ],
      providers: [FormDataService, reducerProvider],
    });

    service = TestBed.get(FormDataService);
    store = TestBed.get(Store as Type<Store<StateWithForm>>);
    spyOn(store, 'dispatch').and.callThrough();
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
    service.loadFormDefinitions(category, FormDefinitionType.PERSONAL_DETAILS);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadFormDefinition({
        categoryCode: category,
        formDefinitionType: FormDefinitionType.PERSONAL_DETAILS,
      })
    );
  });
  it('should load form data', () => {
    service.loadFormData('formDataId');

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.LoadFormData({
        formDataId: mockFormData.id,
      })
    );
  });

  it('should save form data', () => {
    service.saveFormData(mockFormData);

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SaveFormData({
        formData: mockFormData,
      })
    );
  });
});

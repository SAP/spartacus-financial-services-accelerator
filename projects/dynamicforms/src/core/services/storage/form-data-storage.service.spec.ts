import { TestBed } from '@angular/core/testing';
import { YFormData } from './../../models/form-occ.models';
import { FormStorageObject } from './../../models/form-storage.interface';
import {
  DYNAMIC_FORMS_LOCAL_STORAGE_KEY,
  FormDataStorageService,
} from './form-data-storage.service';

const mockFormDataStorageObject: FormStorageObject = {
  formDataId: 'formDataId',
  formDefinitionId: 'formDefinitionId',
  categoryCode: 'categoryCode',
};

const mockFormData: YFormData = {
  id: 'mockFormDataId',
  refId: 'refId',
  formDefinition: {
    formId: 'mockFormDefinitionId',
    applicationId: 'applicationId',
  },
  categoryCode: 'categoryCode',
};

describe('FormDataStorageService', () => {
  let service: FormDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDataStorageService],
    });
    localStorage.setItem(
      DYNAMIC_FORMS_LOCAL_STORAGE_KEY,
      JSON.stringify([mockFormDataStorageObject])
    );
    service = TestBed.inject(FormDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get form storage object by definition code', () => {
    const formDataId =
      service.getFormDataIdByDefinitionCode('formDefinitionId');
    expect(formDataId).toEqual('formDataId');
  });

  it('should get form storage object by category code', () => {
    const formDataId = service.getFormDataIdByCategory('categoryCode');
    expect(formDataId).toEqual('formDataId');
  });

  it('should not find form storage objects when dynamic forms storage is empty', () => {
    service.formLocalStorageData = null;
    const formDataId1 = service.getFormDataIdByCategory('testCategory');
    const formDataId2 = service.getFormDataIdByDefinitionCode(
      'testFormDefinitionCode'
    );

    expect(formDataId1).not.toBeTruthy();
    expect(formDataId2).not.toBeTruthy();
  });

  it('should create new form storage instance in dynamic forms storage', () => {
    service.setFormDataToLocalStorage(mockFormData);

    expect(service.formLocalStorageData.length).toEqual(2);
    expect(service.formLocalStorageData[1]).toEqual({
      formDataId: mockFormData.id,
      formDefinitionId: mockFormData.formDefinition.formId,
      categoryCode: mockFormData.categoryCode,
    });
  });

  it('should override existing storage instance in dynamic forms storage', () => {
    const existingFormData: YFormData = {
      id: 'formDataId',
      refId: 'refId',
      formDefinition: {
        formId: 'formDefinitionId',
        applicationId: 'applicationId',
      },
      categoryCode: 'categoryCode',
    };
    service.setFormDataToLocalStorage(existingFormData);

    expect(service.formLocalStorageData.length).toEqual(1);
    expect(service.formLocalStorageData[0]).toEqual({
      formDataId: existingFormData.id,
      formDefinitionId: existingFormData.formDefinition.formId,
      categoryCode: existingFormData.categoryCode,
    });
  });

  it('should clear formLocalStorageData', () => {
    service.clearFormDataLocalStorage();
    expect(service.formLocalStorageData).toEqual(null);
  });

  it('should initially create dynamic forms storage key', () => {
    service.formLocalStorageData = null;
    service.setFormDataToLocalStorage(mockFormData);

    expect(service.formLocalStorageData).toBeTruthy();
    expect(service.formLocalStorageData.length).toEqual(1);
  });
});

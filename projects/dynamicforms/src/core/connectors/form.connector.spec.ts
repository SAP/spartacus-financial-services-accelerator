import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { YFormData } from './../models/form-occ.models';
import { FormConnector } from './form.connector';
import { FormAdapter } from './form.adapter';
import createSpy = jasmine.createSpy;
import { OCC_USER_ID_CURRENT } from '@spartacus/core';

class MockFormAdapter implements FormAdapter {
  getFormDefinitions = createSpy('FormAdapter.getFormDefinitions').and.callFake(
    (categoryCode, formDefType) =>
      of('getFormDefinitions' + categoryCode + formDefType)
  );
  getFormDefinition = createSpy('FormAdapter.getFormDefinition').and.callFake(
    (applicationID, formDataID) =>
      of('getFormDefinition' + applicationID + formDataID)
  );
  getFormData = createSpy('FormAdapter.getFormData').and.callFake(
    (formDataID, userId) => of('getFormData' + formDataID + userId)
  );
  saveFormData = createSpy('FormAdapter.saveFormData').and.callFake(
    (formData, userId) => of('saveFormData' + formData + userId)
  );
}
const formDefinitionId = 'formDef';
const formDataId = 'formData';
const applicationId = 'app';
const category = 'category';
const formDefinitionType = 'PERSONAL_DETAILS';
const mockFormData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content: '{}',
};

describe('FormConnector', () => {
  let formConnector: FormConnector;
  let formAdapter: FormAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FormAdapter, useClass: MockFormAdapter }],
    });
    formConnector = TestBed.inject(FormConnector);
    formAdapter = TestBed.inject(FormAdapter);
  });

  it('should be created', () => {
    expect(formConnector).toBeTruthy();
  });

  it('should call adapter for getFormDefinitionById', () => {
    formConnector.getFormDefinition(applicationId, formDefinitionId);
    expect(formAdapter.getFormDefinition).toHaveBeenCalledWith(
      applicationId,
      formDefinitionId
    );
  });

  it('should call adapter for getFormDefinitionByCategory', () => {
    formConnector.getFormDefinitions(category, formDefinitionType);
    expect(formAdapter.getFormDefinitions).toHaveBeenCalledWith(
      category,
      formDefinitionType
    );
  });

  it('should call adapter for get form data', () => {
    formConnector.getFormData(formDataId, OCC_USER_ID_CURRENT);
    expect(formAdapter.getFormData).toHaveBeenCalledWith(
      formDataId,
      OCC_USER_ID_CURRENT
    );
  });

  it('should call adapter for save form data', () => {
    formConnector.saveFormData(mockFormData, OCC_USER_ID_CURRENT);
    expect(formAdapter.saveFormData).toHaveBeenCalledWith(
      mockFormData,
      OCC_USER_ID_CURRENT
    );
  });
});

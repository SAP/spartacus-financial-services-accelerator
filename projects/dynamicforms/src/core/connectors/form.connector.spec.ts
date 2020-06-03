import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { YFormData } from './../models/form-occ.models';
import { FormConnector } from './form-connector';
import { FormAdapter } from './form.adapter';
import createSpy = jasmine.createSpy;

class MockFormAdapter implements FormAdapter {
  getFormDefinitionByCategory = createSpy(
    'FormAdapter.getFormDefinitionByCategory'
  ).and.callFake((categoryCode, formDefType) =>
    of('getFormDefinitionByCategory' + categoryCode + formDefType)
  );
  getFormDefinitionById = createSpy(
    'FormAdapter.getFormDefinitionById'
  ).and.callFake((applicationID, formDataID) =>
    of('getFormDefinitionById' + applicationID + formDataID)
  );
  getFormData = createSpy('FormAdapter.getFormData').and.callFake(formDataID =>
    of('getFormData' + formDataID)
  );
  saveFormData = createSpy('FormAdapter.saveFormData').and.callFake(formData =>
    of('saveFormData' + formData)
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
    formConnector = TestBed.get(FormConnector as Type<FormConnector>);
    formAdapter = TestBed.get(FormAdapter as Type<FormAdapter>);
  });

  it('should be created', () => {
    expect(formConnector).toBeTruthy();
  });

  it('should call adapter for getFormDefinitionById', () => {
    formConnector.getFormDefinitionById(applicationId, formDefinitionId);
    expect(formAdapter.getFormDefinitionById).toHaveBeenCalledWith(
      applicationId,
      formDefinitionId
    );
  });

  it('should call adapter for getFormDefinitionByCategory', () => {
    formConnector.getFormDefinitionByCategory(category, formDefinitionType);
    expect(formAdapter.getFormDefinitionByCategory).toHaveBeenCalledWith(
      category,
      formDefinitionType
    );
  });

  it('should call adapter for get form data', () => {
    formConnector.getFormData(formDataId);
    expect(formAdapter.getFormData).toHaveBeenCalledWith(formDataId);
  });

  it('should call adapter for save form data', () => {
    formConnector.saveFormData(mockFormData);
    expect(formAdapter.saveFormData).toHaveBeenCalledWith(mockFormData);
  });
});

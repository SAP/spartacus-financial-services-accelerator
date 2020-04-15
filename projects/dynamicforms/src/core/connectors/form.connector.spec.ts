import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormAdapter } from './form.adapter';
import { FormConnector } from './form-connector';
import createSpy = jasmine.createSpy;

class MockFormAdapter implements FormAdapter {
  getFormDefinition = createSpy(
    'FormDefinitionAdapter.getFormDefinition'
  ).and.callFake((applicationID, formDataID) =>
    of('getFormDefinition' + applicationID + formDataID)
  );
  getFormData = createSpy('FormDefinitionAdapter.getFormData').and.callFake(
    formDataID => of('getFormDefinition' + formDataID)
  );
  createFormData = createSpy(
    'FormDefinitionAdapter.createFormData'
  ).and.callFake(formData => of('getFormDefinition' + formData));
  updateFormData = createSpy(
    'FormDefinitionAdapter.updateFormData'
  ).and.callFake(formData => of('getFormDefinition' + formData));
}
const formDefinitionId = 'formDef';
const formDataId = 'formData';
const applicationId = 'app';
const yformData = {};

describe('FormConnector', () => {
  let changeRequestConnector: FormConnector;
  let changeRequestAdapter: FormAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FormAdapter, useClass: MockFormAdapter }],
    });
    changeRequestConnector = TestBed.get(FormConnector as Type<FormConnector>);
    changeRequestAdapter = TestBed.get(FormAdapter as Type<FormAdapter>);
  });

  it('should be created', () => {
    expect(changeRequestConnector).toBeTruthy();
  });

  it('should call adapter for getFormDefinition', () => {
    changeRequestConnector.getFormDefinition(applicationId, formDefinitionId);
    expect(changeRequestAdapter.getFormDefinition).toHaveBeenCalledWith(
      applicationId,
      formDefinitionId
    );
  });
  it('should call adapter for get form data', () => {
    changeRequestConnector.getFormData(formDataId);
    expect(changeRequestAdapter.getFormData).toHaveBeenCalledWith(formDataId);
  });
  it('should call adapter for create form data', () => {
    changeRequestConnector.createFormData(yformData);
    expect(changeRequestAdapter.createFormData).toHaveBeenCalledWith(yformData);
  });
  it('should call adapter for update form data', () => {
    changeRequestConnector.updateFormData(yformData);
    expect(changeRequestAdapter.updateFormData).toHaveBeenCalledWith(yformData);
  });
});

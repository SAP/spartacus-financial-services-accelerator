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

  it('should call adapter for getFormDefinition', () => {
    formConnector.getFormDefinition(applicationId, formDefinitionId);
    expect(formAdapter.getFormDefinition).toHaveBeenCalledWith(
      applicationId,
      formDefinitionId
    );
  });
  it('should call adapter for get form data', () => {
    formConnector.getFormData(formDataId);
    expect(formAdapter.getFormData).toHaveBeenCalledWith(formDataId);
  });
  it('should call adapter for create form data', () => {
    formConnector.createFormData(yformData);
    expect(formAdapter.createFormData).toHaveBeenCalledWith(yformData);
  });
  it('should call adapter for update form data', () => {
    formConnector.updateFormData(yformData);
    expect(formAdapter.updateFormData).toHaveBeenCalledWith(yformData);
  });
});

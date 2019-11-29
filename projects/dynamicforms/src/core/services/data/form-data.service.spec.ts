import { TestBed } from '@angular/core/testing';

import { FormDataService } from './form-data.service';
import { YFormData, YFormDefinition } from './../../models/form-occ.models';
import { OccFormService } from '../../../occ/services/form/occ-form.service';
import { of, Observable } from 'rxjs';

const mockFormData = {
  general: 'generalSection',
  driver: 'driverSection',
  button: 'submit',
};

const mockFilteredData = {
  general: 'generalSection',
  driver: 'driverSection',
};

const mockData: Observable<YFormData> = of({
  formDefinitionId: 'formDefinitionId',
  id: 'formDataId',
  content: '{test: test}',
});

const mockDefinition: Observable<YFormDefinition> = of({
  id: 'formDataId',
  content: '{testDef: testDef}',
});

const formId = 'formDefinitionId';
const applicationId = 'applicationId';
const formDataId = 'formDataId';
const content = {
  test: 'test',
};

class MockOccYFormService {
  getFormData() {
    return mockData;
  }

  saveFormData() {
    return mockData;
  }

  getFormDefinition() {
    return mockDefinition;
  }
}

describe('FormDataService', () => {
  let service: FormDataService;
  let mockYFormService: MockOccYFormService;

  beforeEach(() => {
    mockYFormService = new MockOccYFormService();
    TestBed.configureTestingModule({
      providers: [
        FormDataService,
        { provide: OccFormService, useValue: mockYFormService },
      ],
    });

    service = TestBed.get(FormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data', () => {
    expect(service.saveFormData(formId, applicationId, content)).toEqual(
      mockData
    );
  });

  it('should get data', () => {
    expect(service.getFormData(formDataId)).toEqual(mockData);
  });

  it('should get definition', () => {
    expect(service.getFormDefinition(applicationId, formId)).toEqual(
      mockDefinition
    );
  });

  it('should filter data', () => {
    expect(service.filterData(mockFormData)).toEqual(mockFilteredData);
  });
});

import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { YFormData } from '../../../core/models/form-occ.models';
import { OccFormAdapter } from './occ-form.adapter';

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

const formData: YFormData = {
  id: 'formDataId',
  formDefinition: {
    formId: 'fromId',
    applicationId: 'applicationId',
  },
};
const formDataNew: YFormData = {
  formDefinition: {
    formId: 'fromId',
    applicationId: 'applicationId',
  },
};
describe('OccFormAdapter', () => {
  let occFormAdapter: OccFormAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccFormAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    occFormAdapter = TestBed.get(OccFormAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('persistFormData', () => {
    it('updateFormData', async(() => {
      occFormAdapter.saveFormData(formData).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/formData/' + formData.id &&
          req.params.append('fields', 'FULL') &&
          req.params.append('definitionId', formData.formDefinition.formId) &&
          req.params.append(
            'applicationId',
            formData.formDefinition.applicationId
          ) &&
          req.params.append('formDataId', '') &&
          req.method === 'PUT'
        );
      }, `PUT method and url`);
    }));
  });

  describe('persistFormData', () => {
    // it('createFormData', async(() => {
    //   occFormAdapter.saveFormData(formDataNew).subscribe();
    //   httpMock.expectOne((req: HttpRequest<any>) => {
    //     return (
    //       req.url === '/forms/formData' &&
    //       req.params.append('fields', 'FULL') &&
    //       req.params.append('definitionId', formData.formDefinition.formId) &&
    //       req.params.append(
    //         'applicationId',
    //         formData.formDefinition.applicationId
    //       ) &&
    //       req.params.append('formDataId', '') &&
    //       req.method === 'POST'
    //     );
    //   }, `POST method and url`);
    // }));
  });
  describe('loadFormData', () => {
    it('loadFormData', async(() => {
      occFormAdapter.getFormData(formData.id).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/formData/' + formData.id &&
          req.params.append('fields', 'FULL') &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  describe('loadFormDefinition', () => {
    it('loadFormDefinition', async(() => {
      occFormAdapter
        .getFormDefinition(
          formData.formDefinition.applicationId,
          formData.formDefinition.formId
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/definitions/' + formData.formDefinition.formId &&
          req.params.append('fields', 'FULL') &&
          req.params.append(
            'applicationId',
            formData.formDefinition.applicationId
          ) &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});

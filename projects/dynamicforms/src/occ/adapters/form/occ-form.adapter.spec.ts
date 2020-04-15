import { async, TestBed } from '@angular/core/testing';

import { OccFormAdapter } from './occ-form.adapter';
import { OccConfig } from '@spartacus/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { YFormData } from '../../../core/models/form-occ.models';

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
describe('OccYformService', () => {
  let service: OccFormAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccFormAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.get(OccFormAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('persistFormData', () => {
    it('updateFormData', async(() => {
      service.updateFormData(formData).subscribe();
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
    it('createFormData', async(() => {
      service.createFormData(formDataNew).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/formData' &&
          req.params.append('fields', 'FULL') &&
          req.params.append('definitionId', formData.formDefinition.formId) &&
          req.params.append(
            'applicationId',
            formData.formDefinition.applicationId
          ) &&
          req.params.append('formDataId', '') &&
          req.method === 'POST'
        );
      }, `POST method and url`);
    }));
  });
  describe('loadFormData', () => {
    it('loadFormData', async(() => {
      service.getFormData(formData.id).subscribe();
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
      service
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

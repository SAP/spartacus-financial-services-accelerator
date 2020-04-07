import { TestBed, async } from '@angular/core/testing';

import { OccFormService } from './occ-form.service';
import { OccConfig } from '@spartacus/core';
import {
  HttpTestingController,
  HttpClientTestingModule,
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
    formId: 'fromDefintionId',
    applicationId: 'applicationId',
  },
};

describe('OccYformService', () => {
  let service: OccFormService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccFormService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.get(OccFormService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('persistFormData', () => {
    it('saveFormData', async(() => {
      service.saveFormData(formData).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/data' &&
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

  describe('loadFormData', () => {
    it('loadFormData', async(() => {
      service.getFormData(formData.id).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/formData/' + formData.id  &&
          req.params.append('fields', 'FULL')  &&
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

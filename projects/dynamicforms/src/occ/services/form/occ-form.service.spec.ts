import { TestBed, async } from '@angular/core/testing';

import { OccFormService } from './occ-form.service';
import { OccConfig } from '@spartacus/core';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';

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

const applicationId = 'application1';
const formDefinitionId = 'definition1';

const formDataId = 'formDataId';

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
      service.saveFormData(formDefinitionId, applicationId, {}).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/data' &&
          req.params.append('fields', 'FULL') &&
          req.params.append('definitionId', formDefinitionId) &&
          req.params.append('applicationId', applicationId) &&
          req.params.append('formDataId', '') &&
          req.method === 'PUT'
        );
      }, `PUT method and url`);
    }));
  });

  describe('loadFormData', () => {
    it('loadFormData', async(() => {
      service.getFormData(formDataId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/data' &&
          req.params.append('fields', 'FULL') &&
          req.params.append('formDataId', formDataId) &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });

  describe('loadFormDefinition', () => {
    it('loadFormDefinition', async(() => {
      service.getFormDefinition(applicationId, formDefinitionId).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === '/forms/definitions/' + formDefinitionId &&
          req.params.append('fields', 'FULL') &&
          req.params.append('applicationId', applicationId) &&
          req.method === 'GET'
        );
      }, `GET method and url`);
    }));
  });
});

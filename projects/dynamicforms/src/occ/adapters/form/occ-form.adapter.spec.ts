import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import {
  OCC_USER_ID_CURRENT,
  OccEndpointsService,
  OCC_USER_ID_ANONYMOUS,
} from '@spartacus/core';
import { YFormData } from '../../../core/models/form-occ.models';
import { OccFormAdapter } from './occ-form.adapter';

const formDataId = 'formDataId';
const formId = 'fromId';
const formData: YFormData = {
  id: formDataId,
  refId: 'refId',
  formDefinition: {
    formId: formId,
    applicationId: 'applicationId',
  },
};
const formDataNew: YFormData = {
  formDefinition: {
    formId: formId,
    applicationId: 'applicationId',
  },
};

class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }

  getEndpoint(url: string) {
    return url;
  }
}

const formDefinitionEndpoint = 'formDefinition';
const formDefinitionsEndpoint = 'formDefinitions';
const formDataEndpoint = 'formData';
const createFormDataEndpoint = 'createFormData';
describe('OccFormAdapter', () => {
  let occFormAdapter: OccFormAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccFormAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    occFormAdapter = TestBed.inject(OccFormAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('persistFormData', () => {
    it(
      'should update existing form data',
      waitForAsync(() => {
        occFormAdapter.saveFormData(formData, OCC_USER_ID_CURRENT).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === formDataEndpoint && req.method === 'PUT';
        }, `PUT method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          formDataEndpoint,
          {
            urlParams: {
              userId: OCC_USER_ID_CURRENT,
              formDataId,
            },
          }
        );
      })
    );

    it(
      'should create new form data for anonymous user',
      waitForAsync(() => {
        occFormAdapter
          .saveFormData(formDataNew, OCC_USER_ID_ANONYMOUS)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === createFormDataEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          createFormDataEndpoint,
          {
            urlParams: {
              userId: OCC_USER_ID_ANONYMOUS,
            },
          }
        );
      })
    );
  });

  describe('loadFormData', () => {
    it(
      'loadFormData',
      waitForAsync(() => {
        occFormAdapter
          .getFormData(formData.id, OCC_USER_ID_CURRENT)
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === formDataEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          formDataEndpoint,
          {
            urlParams: {
              userId: OCC_USER_ID_CURRENT,
              formDataId,
            },
          }
        );
      })
    );
  });

  describe('loadFormDefinitionById', () => {
    it(
      'loadFormDefinition',
      waitForAsync(() => {
        occFormAdapter
          .getFormDefinition(
            formData.formDefinition.applicationId,
            formData.formDefinition.formId
          )
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === formDefinitionEndpoint && req.method === 'GET';
        }, `GET method and url`);

        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          formDefinitionEndpoint,
          {
            urlParams: {
              formDefinitionId: formId,
            },
          }
        );
      })
    );
  });

  describe('loadFormDefinitionByCategory', () => {
    it(
      'loadFormDefinition by category',
      waitForAsync(() => {
        occFormAdapter
          .getFormDefinitions('category', 'formDefinitionType')
          .subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === formDefinitionsEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          formDefinitionsEndpoint
        );
      })
    );
  });
});

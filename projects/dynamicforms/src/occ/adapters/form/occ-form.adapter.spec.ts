import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig, OccEndpointsService } from '@spartacus/core';
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
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }

  getEndpoint(url: string) {
    return url;
  }
}

const formDefinitionEndpoint = 'definition';
const formDefinitionForCategoryEndpoint = 'definitionForCategory';
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
    occFormAdapter = TestBed.get(OccFormAdapter);
    httpMock = TestBed.get(HttpTestingController);
    occEndpointService = TestBed.get(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('persistFormData', () => {
    it('should update existing form data', async(() => {
      occFormAdapter.saveFormData(formData).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === formDataEndpoint && req.method === 'PUT';
      }, `PUT method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(formDataEndpoint, {
        formDataId,
      });
    }));

    it('should create new form data', async(() => {
      occFormAdapter.saveFormData(formDataNew).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === createFormDataEndpoint && req.method === 'POST';
      }, `POST method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        createFormDataEndpoint
      );
    }));
  });

  describe('loadFormData', () => {
    it('loadFormData', async(() => {
      occFormAdapter.getFormData(formData.id).subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === formDataEndpoint && req.method === 'GET';
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(formDataEndpoint, {
        formDataId,
      });
    }));
  });

  describe('loadFormDefinitionById', () => {
    it('loadFormDefinition', async(() => {
      occFormAdapter
        .getFormDefinitionById(
          formData.formDefinition.applicationId,
          formData.formDefinition.formId
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return req.url === formDefinitionEndpoint && req.method === 'GET';
      }, `GET method and url`);

      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        formDefinitionEndpoint,
        {
          formDefinitionId: formId,
        }
      );
    }));
  });

  describe('loadFormDefinitionByCategory', () => {
    it('loadFormDefinition by category', async(() => {
      occFormAdapter
        .getFormDefinitionByCategory('category', 'formDefinitionType')
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === formDefinitionForCategoryEndpoint && req.method === 'GET'
        );
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        formDefinitionForCategoryEndpoint
      );
    }));
  });
});

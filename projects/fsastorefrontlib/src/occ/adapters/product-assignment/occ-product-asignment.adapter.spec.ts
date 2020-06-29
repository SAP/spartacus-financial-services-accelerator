import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccProductAssignmentAdapter } from './occ-product-assignment.adapter';

const fsProductAssignmentCode = 'TestCode';
let userId;
let orgUnitId;

const payload = {
  userId: 'TestID',
  orgUnitId: 'AcmeCorp',
  productCode: 'TestCode',
  active: true,
  pageSize: 5,
  currentPage: 1,
  sort: 'asc',
};
class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

const loadProductAssignmentsEndpoint = 'productAssignments';
const createProductAssignmentsEndpoint = 'createProductAssignments';
const removeProductAssignmentsEndpoint = 'removeProductAssignments';
const updateProductAssignmentsEndpoint = 'updateProductAssignments';

describe('OccProductAssignmentAdapter', () => {
  let productAssignmentAdapter: OccProductAssignmentAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccProductAssignmentAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    productAssignmentAdapter = TestBed.inject(OccProductAssignmentAdapter);
    userId = 'TestID';
    orgUnitId = 'AcmeCorp';
    productAssignmentAdapter = TestBed.inject(OccProductAssignmentAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Load Product Assignments For Unit', () => {
    it('should load ', async(() => {
      productAssignmentAdapter
        .loadProductAssignmentsForUnit(
          payload.userId,
          payload.orgUnitId,
          payload.active,
          payload.pageSize,
          payload.currentPage,
          payload.sort
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === loadProductAssignmentsEndpoint && req.method === 'GET'
        );
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        loadProductAssignmentsEndpoint,
        {
          userId,
          orgUnitId,
        }
      );
    }));
  });

  describe('Create Product Assignment', () => {
    it('should create product assignments', async(() => {
      productAssignmentAdapter
        .createProductAssignment(
          payload.userId,
          payload.orgUnitId,
          payload.productCode
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === createProductAssignmentsEndpoint && req.method === 'POST'
        );
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        createProductAssignmentsEndpoint,
        {
          userId,
          orgUnitId,
        }
      );
    }));
  });
  describe('Remove Product Assignment', () => {
    it('should remove product assignments', async(() => {
      productAssignmentAdapter
        .removeProductAssignment(
          payload.userId,
          payload.orgUnitId,
          payload.productCode
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === removeProductAssignmentsEndpoint &&
          req.method === 'DELETE'
        );
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        removeProductAssignmentsEndpoint,
        {
          userId,
          orgUnitId,
          fsProductAssignmentCode,
        }
      );
    }));
  });
  describe('Change Active Status', () => {
    it('should change active status', async(() => {
      productAssignmentAdapter
        .changeActiveStatus(
          payload.userId,
          payload.orgUnitId,
          payload.productCode,
          payload.active
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === updateProductAssignmentsEndpoint && req.method === 'PATCH'
        );
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        updateProductAssignmentsEndpoint,
        {
          userId,
          orgUnitId,
          fsProductAssignmentCode,
        }
      );
    }));
  });

  describe('Fails to Load Product Assignments For Unit', () => {
    it('should not load payload', async(() => {
      userId = undefined;
      orgUnitId = undefined;
      productAssignmentAdapter
        .loadProductAssignmentsForUnit(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined
        )
        .subscribe();
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url === loadProductAssignmentsEndpoint && req.method === 'GET'
        );
      }, `GET method and url`);
      expect(occEndpointService.getUrl).toHaveBeenCalledWith(
        loadProductAssignmentsEndpoint,
        {
          userId,
          orgUnitId,
        }
      );
    }));
  });
});

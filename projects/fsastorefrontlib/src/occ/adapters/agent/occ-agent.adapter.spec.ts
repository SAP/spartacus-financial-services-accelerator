import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { OccAgentAdapter } from './occ-agent.adapter';

const category = 'insurances_property_renters';
const id = 'test@agent.com';
const searchQuery = 'auto';
const pageNumber = 1;
const agentsEndpoint = 'agents';
const agentEndpoint = 'agent';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccAgentAdapter', () => {
  let adapter: OccAgentAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccAgentAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    adapter = TestBed.inject(OccAgentAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAgentsByCategory', () => {
    it(
      'get Agents By Category',
      waitForAsync(() => {
        adapter.getAgentsByCategory(category).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === agentsEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          agentsEndpoint
        );
      })
    );
  });

  describe('getAgentByID', () => {
    it(
      'gets Agent By ID',
      waitForAsync(() => {
        adapter.getAgentByID(id).subscribe();
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === agentEndpoint && req.method === 'GET';
        }, `GET url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          agentEndpoint,
          {
            id,
          }
        );
      })
    );
  });

  describe('searchAgents', () => {
    it(
      'search Agents By Query String',
      waitForAsync(() => {
        adapter.getAgentsByQuery(searchQuery, pageNumber).subscribe(res => {});
        httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === agentsEndpoint && req.method === 'GET';
        }, `GET method and url`);
        expect(occEndpointService.buildUrl).toHaveBeenCalledWith(
          agentsEndpoint
        );
      })
    );
  });
});

import {
  HttpClientModule,
  HttpErrorResponse,
  HttpRequest,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { OccEndpointsService, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { OccCsTicketAdapter } from './occ-cs-ticket.adapter';

const agentId = 'testAgent';
const ticketData = {
  interest: 'INCIDENT',
  contactType: 'EMAIL',
  subject: 'Ticket subject',
};
const csTicketEndpoint = 'createCsTicket';
class MockOccEndpointsService {
  buildUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}
describe('OccCsTicketAdapter', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let adapter: OccCsTicketAdapter;
  let httpMock: HttpTestingController;
  let occEndpointService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccCsTicketAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    adapter = TestBed.inject(OccCsTicketAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointService, 'buildUrl').and.callThrough();
  });

  describe('createCsTicketForAgent', () => {
    it(
      'create customer support ticket',
      waitForAsync(() => {
        adapter
          .createCsTicketForAgent(undefined, OCC_USER_ID_CURRENT, ticketData)
          .subscribe();
        const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === csTicketEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
      })
    );

    it(
      'create customer support ticket for specific agent',
      waitForAsync(() => {
        adapter
          .createCsTicketForAgent(agentId, OCC_USER_ID_CURRENT, ticketData)
          .subscribe();
        const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
          return req.url === csTicketEndpoint && req.method === 'POST';
        }, `POST method and url`);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
      })
    );

    it('should throw an error', () => {
      let response: any;
      let errResponse: any;
      const errorResponse = new HttpErrorResponse({
        error: '400 error',
        status: 400,
        statusText: 'Bad Request',
      });
      adapter
        .createCsTicketForAgent(agentId, OCC_USER_ID_CURRENT, undefined)
        .subscribe(
          res => (response = res),
          err => (errResponse = err)
        );
      httpMock
        .expectOne((req: HttpRequest<any>) => {
          return req.url === csTicketEndpoint && req.method === 'POST';
        })
        .flush(errorResponse);
      expect(errorResponse.status).toEqual(400);
      expect(errorResponse.name).toEqual('HttpErrorResponse');
    });
  });
});

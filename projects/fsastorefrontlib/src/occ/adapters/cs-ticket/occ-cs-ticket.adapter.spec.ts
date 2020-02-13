import { HttpClientModule, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig, OCC_USER_ID_CURRENT } from '@spartacus/core';
import { OccFsCsTicketAdapter } from './occ-cs-ticket.adapter';

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
const userId = OCC_USER_ID_CURRENT;
const agentId = 'testAgent';
const ticketData = {
  interest: 'INCIDENT',
  contactType: 'EMAIL',
  subject: 'Ticket subject'
};
describe('OccFsCsTicketAdapter', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let adapter: OccFsCsTicketAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        OccFsCsTicketAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    adapter = TestBed.get(OccFsCsTicketAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('createCsTicketForAgent', () => {
    it('create customer support ticket', async(() => {
      adapter.createCsTicketForAgent(undefined, OCC_USER_ID_CURRENT, ticketData).subscribe();
      const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
          '/users' +
          `/${userId}` +
          '/csTickets' &&
          req.method === 'POST'
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    }));

    it('create customer support ticket for specific agent', async(() => {
      adapter.createCsTicketForAgent(agentId, OCC_USER_ID_CURRENT, ticketData).subscribe();
      const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
          '/users' +
          `/${userId}` +
          '/csTickets' &&
          req.method === 'POST'
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    }));

    it('should throw an error', () => {
      let response: any;
      let errResponse: any;
      const errorResponse = new HttpErrorResponse({
        error: '400 error',
        status: 400,
        statusText: 'Bad Request'
      });
      adapter.createCsTicketForAgent(agentId, OCC_USER_ID_CURRENT, undefined).subscribe(res => response = res, err => errResponse = err);
      httpMock.expectOne((req: HttpRequest<any>) => {
        return (
          req.url ===
          '/users' +
          `/${userId}` +
          '/csTickets' &&
          req.method === 'POST'
        );
      }).flush(errorResponse);
      expect(errorResponse.status).toEqual(400);
      expect(errorResponse.name).toEqual('HttpErrorResponse');
  });
  });
});

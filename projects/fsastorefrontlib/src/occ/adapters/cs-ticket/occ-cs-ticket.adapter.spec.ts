import { OccFsCsTicketAdapter } from './occ-cs-ticket.adapter';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { OccConfig, OCC_USER_ID_CURRENT } from '@spartacus/core';

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
const agentId = 'testAgent';
const ticketData = {
  interest: 'INCIDENT',
  contactType: 'EMAIL',
  subject: 'Ticket subject'
};
describe('OccFsCsTicketAdapter', () => {
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
    adapter = TestBed.get(OccFsCsTicketAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('createCsTicketForAgent', () => {
    it('create customer support ticket for agent', async(() => {
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
  });
});

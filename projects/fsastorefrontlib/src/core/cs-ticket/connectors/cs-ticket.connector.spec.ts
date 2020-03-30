import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CsTicketAdapter } from './cs-ticket.adapter';
import { CsTicketConnector } from './cs-ticket.connector';

class MockCsTicketAdapter implements CsTicketAdapter {
  createCsTicketForAgent(
    agentId: string,
    userId: string,
    ticketBody: any
  ): Observable<any> {
    return of();
  }
}
const ticketData = {
  message: 'test message',
  subject: 'test subject',
  ticketCategory: 'PROBLEM',
};
const agentID = 'test@agent.com';

describe('CsTicketConnector', () => {
  let csTicketConnector: CsTicketConnector;
  let csTicketAdapter: CsTicketAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CsTicketAdapter, useClass: MockCsTicketAdapter }],
    });

    csTicketConnector = TestBed.get(CsTicketConnector as Type<
      CsTicketConnector
    >);
    csTicketAdapter = TestBed.get(CsTicketAdapter as Type<CsTicketAdapter>);
  });

  it('should be created', () => {
    expect(csTicketConnector).toBeTruthy();
  });

  it('should call adapter to create customer support ticket', () => {
    spyOn(csTicketAdapter, 'createCsTicketForAgent').and.returnValue(
      of(ticketData)
    );
    let results;
    csTicketConnector
      .createCsTicketForAgent(agentID, OCC_USER_ID_CURRENT, ticketData)
      .subscribe(value => (results = value))
      .unsubscribe();
    expect(results).toEqual(ticketData);
  });
});

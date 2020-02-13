import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { FSCsTicketConnector } from './cs-ticket.connector';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Type } from '@angular/core';
import { FSCsTicketAdapter } from './cs-ticket.adapter';

class MockCsTicketAdapter implements FSCsTicketAdapter {
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

describe('FSCsTicketConnector', () => {
  let csTicketConnector: FSCsTicketConnector;
  let csTicketAdapter: FSCsTicketAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: FSCsTicketAdapter, useClass: MockCsTicketAdapter },
      ],
    });

    csTicketConnector = TestBed.get(FSCsTicketConnector as Type<
      FSCsTicketConnector
    >);
    csTicketAdapter = TestBed.get(FSCsTicketAdapter as Type<FSCsTicketAdapter>);
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

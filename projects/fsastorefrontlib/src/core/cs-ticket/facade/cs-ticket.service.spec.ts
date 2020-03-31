import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { of } from 'rxjs';
import { CsTicketConnector } from './../connectors/cs-ticket.connector';
import { CsTicketService } from './cs-ticket.service';

const testAgent1 = {
  email: 'testAgent1@test.com',
  categories: [
    {
      code: 'test_category1',
    },
  ],
};
const ticketData = {
  message: 'test message',
  subject: 'test subject',
  ticketCategory: 'PROBLEM',
};

class MockOccTicketConnector {
  createCsTicketForAgent() {
    return of(ticketData);
  }
}

describe('CsTicketService', () => {
  let mockOccTicketConnector: MockOccTicketConnector;
  let service: CsTicketService;
  beforeEach(async(() => {
    mockOccTicketConnector = new MockOccTicketConnector();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CsTicketConnector,
          useValue: mockOccTicketConnector,
        },
      ],
    });
    service = TestBed.get(CsTicketService as Type<CsTicketService>);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create ticket for agent', () => {
    spyOn(mockOccTicketConnector, 'createCsTicketForAgent').and.returnValue(
      of(ticketData)
    );
    let tempResult;
    service
      .createCsTicketForAgent(testAgent1.email, OCC_USER_ID_CURRENT, ticketData)
      .subscribe(result => (tempResult = result))
      .unsubscribe();
    expect(tempResult).toBeTruthy();
    expect(tempResult.message).toEqual('test message');
  });
});

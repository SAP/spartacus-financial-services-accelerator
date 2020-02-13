import { TestBed, async } from '@angular/core/testing';
import { Type } from '@angular/core';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { FSCsTicketService } from './cs-ticket.service';
import { FSCsTicketConnector } from './../connectors/cs-ticket.connector';
import { of } from 'rxjs';

const testAgent1 = {
  contactEmail: 'testAgent1@test.com',
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

describe('FSCsTicketService', () => {
  let mockOccTicketConnector: MockOccTicketConnector;
  let service: FSCsTicketService;
  beforeEach(async(() => {
    mockOccTicketConnector = new MockOccTicketConnector();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FSCsTicketConnector,
          useValue: mockOccTicketConnector,
        },
      ],
    });
    service = TestBed.get(FSCsTicketService as Type<FSCsTicketService>);
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
      .createCsTicketForAgent(
        testAgent1.contactEmail,
        OCC_USER_ID_CURRENT,
        ticketData
      )
      .subscribe(result => (tempResult = result))
      .unsubscribe();
    expect(tempResult).toBeTruthy();
    expect(tempResult.message).toEqual('test message');
  });
});

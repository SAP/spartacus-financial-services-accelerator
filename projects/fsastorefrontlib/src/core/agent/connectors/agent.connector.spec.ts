import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { GeoPoint } from '@spartacus/core';
import { AgentConnector } from './agent.connector';
import { AgentAdapter } from './agent.adapter';
import { Type } from '@angular/core';

class MockAgentAdapter implements AgentAdapter {
  getAgentsByCategory(category: string): Observable<any> {
    return of();
  }
  getAgentsByQuery(
    query: string,
    pageNum: number,
    longitudeLatitude?: GeoPoint
  ): Observable<any> {
    return of();
  }
  getAgentByID(id: string): Observable<any> {
    return of();
  }
  createCsTicketForAgent(agentId: string, userId: string, ticketData: any): Observable<any> {
    return of();
  }
}

const searchQuery = 'q=Indirra+Duffy';
const pageNumber = 1;
const geoPoint = {
  latitude: 1.432,
  longitude: 3.5432,
};
const ticketData = {
  message: 'test message',
  subject: 'test subject',
  ticketCategory: 'PROBLEM'
};
const agentID = 'test@agent.com';
const agentCategory = 'auto';
const agentResultsQueryBy = {
  name: 'Indira Duffy',
  id: 'indira.duffy@sapfsa.com',
  category: 'auto',
};
const agentResults = [
  {
    name: 'Aladin Gentry',
    id: 'aladin.gentry@sapfsa.com',
    category: 'auto',
  },
  {
    name: 'Indira Duffy',
    id: 'indira.duffy@sapfsa.com',
    category: 'auto',
  },
];

describe('AgentConnector', () => {
  let agentConnector: AgentConnector;
  let agentAdapter: AgentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AgentAdapter, useClass: MockAgentAdapter }],
    });

    agentConnector = TestBed.get(AgentConnector as Type<AgentConnector>);
    agentAdapter = TestBed.get(AgentAdapter as Type<AgentAdapter>);
  });

  it('should be created', () => {
    expect(agentConnector).toBeTruthy();
  });

  it('should call adapter for get agents by agentCategory', () => {
    spyOn(agentAdapter, 'getAgentsByCategory').and.stub();
    agentConnector.getAgentsByCategory(agentCategory);
    expect(agentAdapter.getAgentsByCategory).toHaveBeenCalledWith(
      agentCategory
    );
  });

  it('should call adapter for get agent by id', () => {
    spyOn(agentAdapter, 'getAgentByID').and.stub();
    agentConnector.getAgentByID(agentID);
    expect(agentAdapter.getAgentByID).toHaveBeenCalledWith(agentID);
  });

  it('should return getAgentsByCategory results ', () => {
    spyOn(agentAdapter, 'getAgentsByCategory').and.returnValue(
      of(agentResults)
    );
    let results;
    agentConnector
      .getAgentsByCategory(agentCategory)
      .subscribe(value => (results = value))
      .unsubscribe();
    expect(results).toEqual(agentResults);
  });

  it('should call adapter for get agents by query', () => {
    spyOn(agentAdapter, 'getAgentsByQuery').and.stub();
    agentConnector.getAgentsByQuery(searchQuery, pageNumber, geoPoint);
    expect(agentAdapter.getAgentsByQuery).toHaveBeenCalledWith(
      searchQuery,
      pageNumber,
      geoPoint
    );
  });

  it('should return getAgentsByQuery results ', () => {
    spyOn(agentAdapter, 'getAgentsByQuery').and.returnValue(
      of(agentResultsQueryBy)
    );
    let results;
    agentConnector
      .getAgentsByQuery(searchQuery, pageNumber, geoPoint)
      .subscribe(value => (results = value))
      .unsubscribe();
    expect(results).toEqual(agentResultsQueryBy);
  });

  it('should call adapter to create customer support ticket', () => {
    spyOn(agentAdapter, 'createCsTicketForAgent').and.returnValue(
      of(ticketData)
    );
    let results;
    agentConnector
      .createCsTicketForAgent(agentID, 'current', ticketData)
      .subscribe(value => (results = value))
      .unsubscribe();
    expect(results).toEqual(ticketData);
  });
});

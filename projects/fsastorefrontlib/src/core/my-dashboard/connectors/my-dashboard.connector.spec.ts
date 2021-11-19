import { TestBed } from '@angular/core/testing';
import { GeoPoint } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { AgentAdapter } from './my-ashboard.adapter';
import { AgentConnector } from './my-dashboard.connector';

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
}

const searchQuery = 'q=Indirra+Duffy';
const pageNumber = 1;
const geoPoint = {
  latitude: 1.432,
  longitude: 3.5432,
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

    agentConnector = TestBed.inject(AgentConnector);
    agentAdapter = TestBed.inject(AgentAdapter);
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
});

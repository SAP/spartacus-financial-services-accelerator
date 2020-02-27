import { GeoPoint, WindowRef } from '@spartacus/core';
import { TestBed, async } from '@angular/core/testing';
import { Type, Component, Input } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { AgentSearchService } from './agent-search.service';
import { AgentConnector } from '../connectors/agent.connector';

const testAgent1 = {
  contactEmail: 'testAgent1@test.com',
  categories: [
    {
      code: 'test_category1',
    },
  ],
};
const testAgent2 = {
  contactEmail: 'testAgent2@test.com',
  categories: [
    {
      code: 'test_category2',
    },
  ],
};

const testAgent3 = {
  contactEmail: 'testAgent3@test.com',
  categories: [
    {
      code: 'test_category3',
    },
  ],
};

const agentsInitialResult: any[] = [testAgent1, testAgent2];
const agentsSearchWithResults: any[] = [testAgent1, testAgent2, testAgent3];

const mockAgentsBS = new BehaviorSubject(agentsInitialResult);

class MockOccAgentAdapter {
  getAgentsByQuery() {
    return of({
      agents: agentsSearchWithResults,
    });
  }
  getAgentByID() {
    return of({
      agent: testAgent1.contactEmail,
    });
  }
}
const queryText = 'test';
const queryTextNoResults = 'noResults';

describe('AgentSearchService', () => {
  let mockOccAgentAdapter: MockOccAgentAdapter;
  let service: AgentSearchService;
  let winRef: WindowRef;
  const geolocationWatchId = 1;
  const longitudeLatitude: GeoPoint = {
    longitude: 10.1,
    latitude: 20.2,
  };
  const MockWindowRef = {
    nativeWindow: {
      navigator: {
        geolocation: {
          watchPosition: callback => {
            callback({ coords: longitudeLatitude });
            return geolocationWatchId;
          },
          clearWatch: () => {},
        },
      },
    },
  };
  beforeEach(async(() => {
    mockOccAgentAdapter = new MockOccAgentAdapter();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AgentConnector,
          useValue: mockOccAgentAdapter,
        },
        {
          provide: WindowRef,
          useValue: MockWindowRef,
        },
      ],
    });
    service = TestBed.get(AgentSearchService as Type<AgentSearchService>);
    winRef = TestBed.get(WindowRef as Type<WindowRef>);
    service.agents = mockAgentsBS;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get results', () => {
    mockAgentsBS.next(agentsInitialResult);
    let tempSearchResult = [];
    service
      .getResults()
      .subscribe(result => (tempSearchResult = result))
      .unsubscribe();
    expect(tempSearchResult).toBeTruthy();
    expect(tempSearchResult.length).toEqual(2);
    expect(tempSearchResult[0]).toBe(testAgent1);
    expect(tempSearchResult[1]).toBe(testAgent2);
  });

  it('should get agent by ID', () => {
    let agentResult;
    spyOn(mockOccAgentAdapter, 'getAgentByID').and.returnValue(
      of({
        agent: testAgent1.contactEmail,
      })
    );
    service
      .getAgentByID(testAgent1.contactEmail)
      .subscribe(result => (agentResult = result))
      .unsubscribe();
    expect(agentResult).toBeTruthy();
  });

  it('should fetch agents by search query', () => {
    service.search(queryText, 0);
    let tempSearchResult = {
      agents: [],
    };
    service
      .getResults()
      .subscribe(result => (tempSearchResult = result))
      .unsubscribe();
    expect(tempSearchResult.agents.length).toEqual(3);
    expect(service.agents).toBeTruthy();
  });

  it('should not return agents', () => {
    spyOn(mockOccAgentAdapter, 'getAgentsByQuery').and.returnValue(
      of({
        agents: [],
      })
    );
    service.search(queryTextNoResults, 0);
    let tempSearchResult = {
      agents: [],
    };
    service
      .getResults()
      .subscribe(result => (tempSearchResult = result))
      .unsubscribe();
    expect(tempSearchResult.agents.length).toEqual(0);
    expect(service.agents).toBeTruthy();
  });
});

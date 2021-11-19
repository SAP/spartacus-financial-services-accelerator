import { waitForAsync, TestBed } from '@angular/core/testing';
import { GeoPoint, WindowRef } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { MyDashboardConnector } from '../connectors/my-dashboard.connector';
import { AgentSearchService } from './my-dashboard.service';

const testAgent1 = {
  email: 'testAgent1@test.com',
  categories: [
    {
      code: 'test_category1',
    },
  ],
};
const testAgent2 = {
  email: 'testAgent2@test.com',
  categories: [
    {
      code: 'test_category2',
    },
  ],
};

const testAgent3 = {
  email: 'testAgent3@test.com',
  categories: [
    {
      code: 'test_category3',
    },
  ],
};

const agentsInitialResult: any[] = [testAgent1, testAgent2];
const agentsSearchWithResults: any[] = [testAgent1, testAgent2, testAgent3];

const mockAgentsBS = new BehaviorSubject(agentsInitialResult);

class MockOccAgentConnector {
  getAgentsByQuery() {
    return of({
      agents: agentsSearchWithResults,
    });
  }
  getAgentByID() {
    return of({
      agent: testAgent1.email,
    });
  }
}
const queryText = 'test';
const queryTextNoResults = 'noResults';

describe('AgentSearchService', () => {
  let mockOccAgentConnector: MockOccAgentConnector;
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
  beforeEach(
    waitForAsync(() => {
      mockOccAgentConnector = new MockOccAgentConnector();
      TestBed.configureTestingModule({
        providers: [
          {
            provide: AgentConnector,
            useValue: mockOccAgentConnector,
          },
          {
            provide: WindowRef,
            useValue: MockWindowRef,
          },
        ],
      });
      service = TestBed.inject(AgentSearchService);
      winRef = TestBed.inject(WindowRef);
      service.agents = mockAgentsBS;
    })
  );

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
    spyOn(mockOccAgentConnector, 'getAgentByID').and.returnValue(
      of({
        agent: testAgent1.email,
      })
    );
    service
      .getAgentByID(testAgent1.email)
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
    spyOn(mockOccAgentConnector, 'getAgentsByQuery').and.returnValue(
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

import { TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { AgentSearchService } from './agent-search.service';
import { OccAgentAdapter } from './../../../occ/services/agent/occ-agent.adapter';
import { GeoPoint, WindowRef } from '@spartacus/core';

const geolocationWatchId = 1;

const searchResults = {
  agents: [
    {
      firstName: 'firstName',
      lastName: 'lastName',
    },
  ],
};

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

class MockOccAgentAdapter {
  searchAgents() {
    return of(searchResults);
  }
}

describe('AgentSearchService', () => {
  let mockOccAgentAdapter: MockOccAgentAdapter;

  beforeEach(async(() => {
    mockOccAgentAdapter = new MockOccAgentAdapter();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OccAgentAdapter,
          useValue: mockOccAgentAdapter,
        },
        {
          provide: WindowRef,
          useValue: MockWindowRef,
        },
      ],
    });
  }));

  it('should be created', () => {
    const service: AgentSearchService = TestBed.get(AgentSearchService);
    expect(service).toBeTruthy();
  });
});

import { OccAgentAdapter } from './../../../occ/services/agent/occ-agent.adapter';
import { TestBed, async } from '@angular/core/testing';

import { AgentSearchService } from './agent-search.service';
import { of } from 'rxjs';

const searchResults = {
  agents: [
    {
      firstName: 'firstName',
      lastName: 'lastName',
    },
  ],
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
      ],
    });
  }));

  it('should be created', () => {
    const service: AgentSearchService = TestBed.get(AgentSearchService);
    expect(service).toBeTruthy();
  });
});

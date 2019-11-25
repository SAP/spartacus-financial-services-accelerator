import { TestBed, async } from '@angular/core/testing';

import { AgentSearchService } from './agent-search.service';
import { of } from 'rxjs';
import { OccAgentService } from '../../../occ/services/agent/agent.service';

const searchResults = {
  agents: [
    {
      firstName: 'firstName',
      lastName: 'lastName',
    },
  ],
};

class MockOccAgentService {
  searchAgents() {
    return of(searchResults);
  }
}

describe('AgentSearchService', () => {
  let mockOccAgentService: MockOccAgentService;

  beforeEach(async(() => {
    mockOccAgentService = new MockOccAgentService();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OccAgentService,
          useValue: mockOccAgentService,
        },
      ],
    });
  }));

  it('should be created', () => {
    const service: AgentSearchService = TestBed.get(AgentSearchService);
    expect(service).toBeTruthy();
  });
});

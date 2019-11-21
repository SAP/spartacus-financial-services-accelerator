import { TestBed } from '@angular/core/testing';

import { AgentSearchService } from './agent-search.service';

describe('AgentDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentSearchService = TestBed.get(AgentSearchService);
    expect(service).toBeTruthy();
  });
});

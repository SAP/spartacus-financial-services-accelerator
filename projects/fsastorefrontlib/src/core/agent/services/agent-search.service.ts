import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OccAgentService } from '../../../occ/services/agent/agent.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgentSearchService {
  constructor(protected occAgentService: OccAgentService) {}

  agentListSource = new BehaviorSubject<any>(null);
  agentDetailsSource = new BehaviorSubject<any>(null);

  search(searchQuery: string, pageNumber?: number) {
    this.occAgentService
      .searchAgents(searchQuery, pageNumber)
      .pipe(
        map(searchResults => {
          this.agentListSource.next(searchResults);
          if (searchResults.agents) {
            this.agentDetailsSource.next(searchResults.agents[0]);
          }
        })
      )
      .subscribe();
  }

  getResults(): Observable<any> {
    return this.agentListSource.asObservable();
  }

  setAgent(agent: any) {
    this.agentDetailsSource.next(agent);
  }

  getAgent() {
    return this.agentDetailsSource.asObservable();
  }
}

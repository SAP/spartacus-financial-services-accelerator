import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OccAgentService } from '../../../occ/services/agent/agent.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgentSearchService {
  constructor(protected occAgentService: OccAgentService) {}

  agents = new BehaviorSubject<any>(null);
  agentDetails = new BehaviorSubject<any>(null);

  search(searchQuery: string, pageNumber: number) {
    this.occAgentService
      .getAgentsByQuery(searchQuery, pageNumber)
      .pipe(take(1))
      .subscribe(searchResults => {
        this.agents.next(searchResults);
        if (searchResults.agents) {
          this.agentDetails.next(searchResults.agents[0]);
        }
      });
  }

  getResults(): Observable<any> {
    return this.agents.asObservable();
  }

  setAgent(agent: any) {
    this.agentDetails.next(agent);
  }

  getAgent() {
    return this.agentDetails.asObservable();
  }
}

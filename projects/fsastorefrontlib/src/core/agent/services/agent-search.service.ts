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

  search(searchQuery: string) {
    this.occAgentService
      .searchAgents(searchQuery)
      .pipe(
        map(agents => {
          this.agentListSource.next(agents);
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

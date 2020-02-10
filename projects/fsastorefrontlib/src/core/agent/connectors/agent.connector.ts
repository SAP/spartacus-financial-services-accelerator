import { GeoPoint } from '@spartacus/core';
import { AgentAdapter } from './agent.adapter';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgentConnector {
  constructor(protected agentAdapter: AgentAdapter) {}

  getAgentsByCategory(category: string): Observable<any> {
    return this.agentAdapter.getAgentsByCategory(category);
  }

  getAgentsByQuery(
    searchQuery: string,
    pageNumber: number,
    longitudeLatitude?: GeoPoint
  ): Observable<any> {
    return this.agentAdapter.getAgentsByQuery(
      searchQuery,
      pageNumber,
      longitudeLatitude
    );
  }
}

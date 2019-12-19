import { Injectable } from '@angular/core';
import { GeoPoint, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccAgentAdapter } from './../../../occ/services/agent/occ-agent.adapter';

@Injectable({
  providedIn: 'root',
})
export class AgentSearchService {
  constructor(
    protected occAgentAdapter: OccAgentAdapter,
    protected winRef: WindowRef
  ) {}

  agents = new BehaviorSubject<any>(null);
  agentDetails = new BehaviorSubject<any>(null);

  private geolocationWatchId: number = null;

  search(searchQuery: string, pageNumber: number) {
    let position: GeoPoint;
    if (this.winRef.nativeWindow) {
      this.geolocationWatchId = this.winRef.nativeWindow.navigator.geolocation.watchPosition(
        (pos: Position) => {
          position = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };
          this.getAgentsByQuery(searchQuery, pageNumber, position);

          this.clearWatchGeolocation();
        },
        () => {
          this.getAgentsByQuery(searchQuery, pageNumber);
        }
      );
    }
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

  private getAgentsByQuery(
    searchQuery: string,
    pageNumber: number,
    position?: GeoPoint
  ) {
    this.occAgentAdapter
      .getAgentsByQuery(searchQuery, pageNumber, position)
      .pipe(take(1))
      .subscribe(searchResults => {
        this.agents.next(searchResults);
        if (searchResults.agents) {
          this.agentDetails.next(searchResults.agents[0]);
        }
      });
  }

  private clearWatchGeolocation() {
    if (this.geolocationWatchId !== null) {
      this.winRef.nativeWindow.navigator.geolocation.clearWatch(
        this.geolocationWatchId
      );
      this.geolocationWatchId = null;
    }
  }
}

import { Injectable } from '@angular/core';
import { GeoPoint, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgentConnector } from '../connectors/agent.connector';

@Injectable({
  providedIn: 'root',
})
export class AgentSearchService {
  constructor(
    protected agentConnector: AgentConnector,
    protected winRef: WindowRef
  ) {}

  agents = new BehaviorSubject<any>(null);
  resetSearchValueSource = new Subject<boolean>();
  resetSearchValue = this.resetSearchValueSource.asObservable();

  private geolocationWatchId: number = null;

  search(searchQuery: string, pageNumber: number) {
    let position: GeoPoint;
    if (this.winRef.nativeWindow) {
      if (this.geolocationWatchId) {
        this.clearWatchGeolocation();
      }

      this.geolocationWatchId =
        this.winRef.nativeWindow.navigator.geolocation.watchPosition(
          pos => {
            position = {
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude,
            };
            this.getAgentsByQuery(searchQuery, pageNumber, position);
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

  getAgentByID(agentID): Observable<any> {
    return this.agentConnector.getAgentByID(agentID);
  }

  protected getAgentsByQuery(
    searchQuery: string,
    pageNumber: number,
    position?: GeoPoint
  ) {
    this.agentConnector
      .getAgentsByQuery(searchQuery, pageNumber, position)
      .pipe(
        map(searchResults => {
          if (searchResults) {
            this.agents.next(searchResults);
          }
        })
      )
      .subscribe();
  }

  private clearWatchGeolocation() {
    if (this.geolocationWatchId !== null) {
      this.winRef.nativeWindow.navigator.geolocation.clearWatch(
        this.geolocationWatchId
      );
      this.geolocationWatchId = null;
    }
  }

  setResetSearchValue(isReset: boolean) {
    this.resetSearchValueSource.next(isReset);
  }
}

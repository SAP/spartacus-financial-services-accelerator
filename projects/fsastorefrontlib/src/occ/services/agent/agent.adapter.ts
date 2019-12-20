import { Observable } from 'rxjs';
import { GeoPoint } from '@spartacus/core';

export abstract class AgentAdapter {
  /**
   * Abstract method used to get agents by category.
   *
   * @param category The `category` used for fetching agents
   */
  abstract getAgentsByCategory(category: string): Observable<any>;

  /**
   * Abstract method used to get agents using search query.
   *
   * @param searchQuery The search query
   * @param pageNumber The number of page which enlisted agents
   * @param longitudeLatitude The longitude and latitude provided
   */
  abstract getAgentsByQuery(
    searchQuery: string,
    pageNumber: number,
    longitudeLatitude?: GeoPoint
  );
}

import { Observable } from 'rxjs';

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
   */
  abstract getAgentsByQuery(searchQuery: string, pageNumber: number);
}

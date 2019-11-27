import { Observable } from 'rxjs';

export abstract class AgentAdapter {
  /**
   * Abstract method used to get agents by category.
   *
   * @param category The `category` used for fetching agents
   */
  abstract getAgentsByCategory(category: string): Observable<any>;
}

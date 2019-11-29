import { Observable } from 'rxjs';

export abstract class PolicyAdapter {
  /**
   * Abstract method used to get policies for user
   *
   * @param userId The user id
   */
  abstract getPolicies(userId: string): Observable<any>;

  /**
   * Abstract method used to get policies by category
   *
   * @param userId The user id
   * @param policyCategoryCode The category of policy
   */
  abstract getPoliciesByCategory(
    userId: string,
    policyCategoryCode: string
  ): Observable<any>;
}

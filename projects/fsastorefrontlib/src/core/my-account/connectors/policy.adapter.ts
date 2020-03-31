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

  /**
   * Abstract method used to get premium calendar
   *
   * @param userId The user id
   */
  abstract getPremiumCalendar(userId: string): Observable<any>;

  /**
   * Abstract method used to get policy
   *
   * @param userId The user id
   * @param policyId The policy id
   * @param contractId The contract id
   */
  abstract getPolicy(
    userId: string,
    policyId: string,
    contractId: string
  ): Observable<any>;
}

import { Observable } from 'rxjs';

export abstract class ChangeRequestAdapter {
  /**
   * Abstract method used to create change request for insurance policy version
   *
   * @param policyId The policy id
   * @param contractId The contract id
   * @param userId The user id
   */
  abstract createChangeRequestForPolicy(
    policyId: string,
    contractId: string,
    userId: string
  ): Observable<any>;
}

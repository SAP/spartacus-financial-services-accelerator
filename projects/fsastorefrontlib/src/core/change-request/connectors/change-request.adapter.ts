import { Observable } from 'rxjs';

export abstract class ChangeRequestAdapter {
  /**
   * Abstract method used to get change request
   *
   * @param userId The user id
   * @param requestId The user request id
   */
  abstract getChangeRequest(userId: string, requestId: string): Observable<any>;

  /**
   * Abstract method used to simulate change request
   *
   * @param userId The user id
   * @param requestId The user request id
   * @param changeRequest The change request data

   */
  abstract simulateChangeRequst(
    userId: string,
    requestId: string,
    changeRequest: any
  ): Observable<any>;

  /**
   * Abstract method used to create change request for insurance policy version
   *
   * @param policyId The policy id
   * @param contractId The contract id
   * @param userId The user id
   * @param changeRequestType The type of change request for insurance policy
   */
  abstract createChangeRequestForPolicy(
    policyId: string,
    contractId: string,
    changeRequestType: string,
    userId: string
  ): Observable<any>;
}

import { Observable } from 'rxjs';

export abstract class ClaimAdapter {
  /**
   * Abstract method used to get claims for user
   *
   * @param userId The user id
   */
  abstract getClaims(userId: string): Observable<any>;

  /**
   * Abstract method used to delete claim
   *
   * @param userId The user id
   * @param claimId The claim id
   */
  abstract deleteClaim(userId: string, claimId: string): Observable<any>;

  /**
   * Abstract method used to create claim for insurance policy
   *
   * @param userId The user id
   * @param policyId The code of policy
   * @param contractNumber The contract number of policy
   */
  abstract createClaim(
    userId: string,
    policyId: string,
    contractNumber: string
  );

  /**
   * Abstract method used to update claim
   *
   * @param userId The user id
   * @param claimId The code of claim
   * @param claimData The content of claim
   */
  abstract updateClaim(
    userId: string,
    claimId: string,
    claimData: any
  ): Observable<any>;
}

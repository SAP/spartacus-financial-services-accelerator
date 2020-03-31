import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ClaimAdapter } from './claim.adapter';

@Injectable({
  providedIn: 'root',
})
export class ClaimConnector {
  constructor(protected adapter: ClaimAdapter) {}

  getClaims(userId: string): Observable<any> {
    return this.adapter.getClaims(userId);
  }

  deleteClaim(userId: string, claimId: string): Observable<any> {
    return this.adapter.deleteClaim(userId, claimId);
  }

  createClaim(
    userId: string,
    policyId: string,
    contractNumber: string
  ): Observable<any> {
    return this.adapter.createClaim(userId, policyId, contractNumber);
  }

  getClaim(userId: string, claimId: string): Observable<any> {
    return this.adapter.getClaim(userId, claimId);
  }

  updateClaim(
    userId: string,
    claimId: string,
    claimData: any
  ): Observable<any> {
    return this.adapter.updateClaim(userId, claimId, claimData);
  }
}

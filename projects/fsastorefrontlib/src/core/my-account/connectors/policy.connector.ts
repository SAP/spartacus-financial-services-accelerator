import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PolicyAdapter } from './policy.adapter';

@Injectable({
  providedIn: 'root',
})
export class PolicyConnector {
  constructor(protected adapter: PolicyAdapter) {}

  getPolicies(userId: string): Observable<any> {
    return this.adapter.getPolicies(userId);
  }

  getPoliciesByCategory(
    userId: string,
    policyCategoryCode: string
  ): Observable<any> {
    return this.adapter.getPoliciesByCategory(userId, policyCategoryCode);
  }

  getPremiumCalendar(userId: string): Observable<any> {
    return this.adapter.getPremiumCalendar(userId);
  }

  getPolicy(
    userId: string,
    policyId: string,
    contractId: string
  ): Observable<any> {
    return this.adapter.getPolicy(userId, policyId, contractId);
  }
}
